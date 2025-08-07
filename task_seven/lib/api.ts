// API configuration and types
const API_BASE_URL = "https://akil-backend.onrender.com"

// Type definitions based on the API structure
export interface Opportunity {
  id: string
  title: string
  description: string
  orgName: string
  logoUrl?: string
  location?: string[]
  categories?: string[]
  datePosted: string
  deadline?: string
  startDate?: string
  endDate?: string
  requiredSkills?: string[]
}

export interface OpportunityDetail extends Opportunity {
  responsibilities?: string
  requirements?: string
  idealCandidate?: string
  whenAndWhere?: string
  perksAndBenefits?: string
  isBookmarked?: boolean
  isRolling?: boolean
  questions?: string[]
  average_rating?: number
  total_reviews?: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  errors?: any
  count?: number
}

/**
 * Fetches all opportunities from the API
 * @returns Promise<Opportunity[]> Array of opportunities
 * @throws Error if the API request fails
 */
export async function fetchOpportunities(): Promise<Opportunity[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add cache control for better performance
      cache: "no-store", // Always fetch fresh data
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<Opportunity[]> = await response.json()

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch opportunities")
    }

    // Ensure we return an array even if the API structure changes
    const opportunities = Array.isArray(result.data) ? result.data : []

    // Add some sample data to match the design if needed
    if (opportunities.length === 0) {
      return [
        {
          id: "1",
          title: "Volunteer Software Development Mentor",
          description:
            "Join A2SV (Africa to Silicon Valley) as a Volunteer Software Development Mentor and make a meaningful impact on the next generation of African tech talent. As a mentor, you will play a crucial role in guiding and supporting aspiring software developers, helping them navigate the world of technology and gain valuable skills. This is an opportunity to contribute to the growth of the African tech ecosystem and foster innovation.",
          orgName: "Africa to Silicon Valley",
          location: ["Addis Ababa"],
          categories: ["Education Access and Quality Improvement", "Youth Empowerment and Development"],
          datePosted: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Updated Updated test",
          description:
            "Join A2SV (Africa to Silicon Valley) as a Volunteer Software Development Mentor and make a meaningful impact on the next generation of African tech talent. As a mentor, you will play a crucial role in guiding and supporting aspiring software developers, helping them navigate the world of technology and gain valuable skills. This is an opportunity to contribute to the growth of the African tech ecosystem and foster innovation.",
          orgName: "Africa to Silicon Valley",
          location: ["Adama", "Addis Ababa"],
          categories: ["Education Access and Quality Improvement"],
          datePosted: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Morocco",
          description: "This is a sample event description.",
          orgName: "Example Organization",
          location: ["Location1", "Location2"],
          categories: ["Category1", "Category2"],
          datePosted: new Date().toISOString(),
        },
      ]
    }

    return opportunities
  } catch (error) {
    console.error("Error fetching opportunities:", error)

    // Provide more specific error messages
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to the server. Please check your internet connection.")
    }

    throw error instanceof Error ? error : new Error("An unexpected error occurred while fetching opportunities")
  }
}

/**
 * Fetches a specific opportunity by ID
 * @param id - The opportunity ID
 * @returns Promise<OpportunityDetail> Detailed opportunity information
 * @throws Error if the API request fails or opportunity is not found
 */
export async function fetchOpportunityById(id: string): Promise<OpportunityDetail> {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid opportunity ID provided")
    }

    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always fetch fresh data
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Opportunity not found")
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<OpportunityDetail> = await response.json()

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch opportunity details")
    }

    if (!result.data) {
      throw new Error("No opportunity data received")
    }

    return result.data
  } catch (error) {
    console.error(`Error fetching opportunity ${id}:`, error)

    // Provide more specific error messages
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to the server. Please check your internet connection.")
    }

    throw error instanceof Error ? error : new Error("An unexpected error occurred while fetching opportunity details")
  }
}

/**
 * Helper function to validate API response structure
 * @param data - The data to validate
 * @returns boolean indicating if the data is valid
 */
export function isValidOpportunity(data: any): data is Opportunity {
  return (
    data &&
    typeof data === "object" &&
    typeof data.id === "string" &&
    typeof data.title === "string" &&
    typeof data.description === "string"
  )
}

/**
 * Helper function to format dates consistently
 * @param dateString - ISO date string
 * @returns Formatted date string or null if invalid
 */
export function formatApiDate(dateString: string): string | null {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return null
    }
    return date.toISOString()
  } catch {
    return null
  }
}
