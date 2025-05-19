"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import api from "../../../services/api"

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:before {
    content: '←';
    margin-right: 0.5rem;
  }
`

const ComplaintCard = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
  margin-bottom: 2rem;
`

const ComplaintHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const ComplaintTitle = styled.h1`
  color: var(--primary);
  margin: 0;
  font-size: 1.75rem;
`

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${({ $status }) => {
    switch ($status) {
      case "pending":
        return "rgba(236, 201, 75, 0.2)"
      case "in-progress":
        return "rgba(66, 153, 225, 0.2)"
      case "resolved":
        return "rgba(56, 161, 105, 0.2)"
      case "rejected":
        return "rgba(229, 62, 62, 0.2)"
      default:
        return "rgba(113, 128, 150, 0.2)"
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case "pending":
        return "var(--warning)"
      case "in-progress":
        return "var(--info)"
      case "resolved":
        return "var(--success)"
      case "rejected":
        return "var(--danger)"
      default:
        return "var(--gray)"
    }
  }};
`

const ComplaintBody = styled.div`
  padding: 1.5rem;
`

const ComplaintMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
`

const MetaLabel = styled.span`
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 0.25rem;
`

const MetaValue = styled.span`
  font-weight: 500;
`

const ComplaintDescription = styled.div`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const ComplaintImage = styled.div`
  margin-top: 1.5rem;
  
  img {
    max-width: 100%;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }
`

const TimelineCard = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const TimelineTitle = styled.h2`
  color: var(--primary);
  margin-bottom: 1.5rem;
`

const Timeline = styled.div`
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 16px;
    width: 2px;
    background-color: var(--gray-light);
  }
`

const TimelineItem = styled.div`
  position: relative;
  padding-left: 40px;
  padding-bottom: 1.5rem;
  
  &:last-child {
    padding-bottom: 0;
  }
`

const TimelineDot = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ $status }) => {
    switch ($status) {
      case "pending":
        return "var(--warning)"
      case "in-progress":
        return "var(--info)"
      case "resolved":
        return "var(--success)"
      case "rejected":
        return "var(--danger)"
      default:
        return "var(--gray)"
    }
  }};
`

const TimelineContent = styled.div`
  background-color: var(--neutral-light);
  padding: 1rem;
  border-radius: var(--radius);
`

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const TimelineStatus = styled.span`
  font-weight: 600;
  color: ${({ $status }) => {
    switch ($status) {
      case "pending":
        return "var(--warning)"
      case "in-progress":
        return "var(--info)"
      case "resolved":
        return "var(--success)"
      case "rejected":
        return "var(--danger)"
      default:
        return "var(--gray)"
    }
  }};
`

const TimelineDate = styled.span`
  color: var(--gray);
  font-size: 0.9rem;
`

const TimelineText = styled.p`
  margin: 0;
`

const ResponsesCard = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const ResponsesTitle = styled.h2`
  color: var(--primary);
  margin-bottom: 1.5rem;
`

const Response = styled.div`
  border: 1px solid var(--gray-light);
  border-radius: var(--radius);
  padding: 1rem;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`


const ResponseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const ResponseFrom = styled.span`
  font-weight: 600;
`

const ResponseDate = styled.span`
  color: var(--gray);
  font-size: 0.9rem;
`

const ResponseText = styled.p`
  margin: 0;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--gray);
`

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--gray);
`

const ComplaintDetails = () => {
  const { id } = useParams()
  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        setLoading(true)

        const response = await api.get(`/api/complaints/${id}`)
        // The API returns data in response.data.data
        setComplaint(response.data.data)
        console.log("Complaint data:", response.data.data)
      } catch (err) {
        console.error("Error fetching complaint details:", err)
        setError("Failed to load complaint details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchComplaintDetails()
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  if (loading) {
    return (
      <PageContainer>
        <LoadingState>Loading complaint details...</LoadingState>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <EmptyState>{error}</EmptyState>
      </PageContainer>
    )
  }

  if (!complaint) {
    return (
      <PageContainer>
        <EmptyState>Complaint not found</EmptyState>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <BackLink to="/citizen/my-complaints">Back to My Complaints</BackLink>

      <ComplaintCard>
        <ComplaintHeader>
          <ComplaintTitle>{complaint.title}</ComplaintTitle>
          <StatusBadge $status={complaint.status || "pending"}>
            {complaint.status ? complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1) : "Pending"}
          </StatusBadge>
        </ComplaintHeader>

        <ComplaintBody>
          <ComplaintMeta>
            <MetaItem>
              <MetaLabel>Complaint ID</MetaLabel>
              <MetaValue>#{complaint.complaintId}</MetaValue>
            </MetaItem>

            <MetaItem>
              <MetaLabel>Submitted On</MetaLabel>
              <MetaValue>{formatDate(complaint.createdAt)}</MetaValue>
            </MetaItem>

            <MetaItem>
              <MetaLabel>Category</MetaLabel>
              <MetaValue>{complaint.category && complaint.category.name ? complaint.category.name : "Uncategorized"}</MetaValue>
            </MetaItem>

            <MetaItem>
              <MetaLabel>Location</MetaLabel>
              <MetaValue>
                {complaint.province ? 
                  `${complaint.province}${complaint.district ? `, ${complaint.district}` : ''}${complaint.sector ? `, ${complaint.sector}` : ''}` : 
                  (complaint.location && complaint.location.name ? complaint.location.name : "Not specified")}
              </MetaValue>
            </MetaItem>
          </ComplaintMeta>

          <ComplaintDescription>
            <h3>Description</h3>
            <p>{complaint.description}</p>
          </ComplaintDescription>

          {complaint.imageUrl && (
            <ComplaintImage>
              <h3>Attached Image</h3>
              <img src={complaint.imageUrl || "/placeholder.svg"} alt="Complaint" />
            </ComplaintImage>
          )}
        </ComplaintBody>
      </ComplaintCard>

      <TimelineCard>
        <TimelineTitle>Status Timeline</TimelineTitle>

        <Timeline>
          {complaint.statusHistory && complaint.statusHistory.map((status, index) => (
            <TimelineItem key={index}>
              <TimelineDot $status={status.status || "pending"} />
              <TimelineContent>
                <TimelineHeader>
                  <TimelineStatus $status={status.status || "pending"}>
                    {status.status ? status.status.charAt(0).toUpperCase() + status.status.slice(1) : "Pending"}
                  </TimelineStatus>
                  <TimelineDate>{formatDate(status.timestamp)}</TimelineDate>
                </TimelineHeader>
                <TimelineText>{status.comment || `Complaint marked as ${status.status || "pending"}`}</TimelineText>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </TimelineCard>

      <ResponsesCard>
        <ResponsesTitle>Responses</ResponsesTitle>

        {complaint.responses && complaint.responses.length > 0 ? (
          complaint.responses.map((response, index) => (
            <Response key={index}>
              <ResponseHeader>
                <ResponseFrom>
                  {response.from && response.from.name ? 
                    `${response.from.name} ${response.from.department ? `(${response.from.department})` : ''}` : 
                    'Unknown'}
                </ResponseFrom>
                <ResponseDate>{formatDate(response.createdAt)}</ResponseDate>
              </ResponseHeader>
              <ResponseText>{response.message || ''}</ResponseText>
            </Response>
          ))
        ) : (
          <EmptyState>No responses yet</EmptyState>
        )}
      </ResponsesCard>
    </PageContainer>
  )
}

export default ComplaintDetails
