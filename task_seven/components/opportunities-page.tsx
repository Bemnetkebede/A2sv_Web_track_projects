"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { fetchOpportunities, type Opportunity } from "@/lib/api"

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("most-relevant")

  useEffect(() => {
    loadOpportunities()
  }, [])

  const loadOpportunities = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchOpportunities()
      setOpportunities(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load opportunities")
      console.error("Error loading opportunities:", err)
    } finally {
      setLoading(false)
    }
  }

  // Function to get company logo/avatar
  const getCompanyLogo = (orgName: string, index: number) => {
    if (orgName?.toLowerCase().includes("a2sv") || orgName?.toLowerCase().includes("africa to silicon valley")) {
      return (
        <div className="w-12 h-12 flex items-center justify-center">
          <span className="text-lg font-bold text-blue-600">A2SV</span>
        </div>
      )
    }

    // For other companies, show a colored circle with initial
    const colors = ["bg-yellow-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-indigo-500"]
    const bgColor = colors[index % colors.length]
    const initial = orgName?.charAt(0).toUpperCase() || "C"

    return (
      <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
        <span className="text-white font-bold text-lg">{initial}</span>
      </div>
    )
  }

  // Function to get badge styling based on category
  const getBadgeStyle = (category: string, index: number) => {
    const lowerCategory = category.toLowerCase()

    if (lowerCategory.includes("person") || lowerCategory.includes("in-person")) {
      return "bg-green-100 text-green-700 hover:bg-green-200"
    }
    if (lowerCategory.includes("virtual") || lowerCategory.includes("remote")) {
      return "bg-purple-100 text-purple-700 hover:bg-purple-200"
    }
    if (lowerCategory.includes("education") || lowerCategory.includes("quality")) {
      return "bg-blue-100 text-blue-700 hover:bg-blue-200"
    }
    if (lowerCategory.includes("youth") || lowerCategory.includes("development")) {
      return "bg-blue-100 text-blue-700 hover:bg-blue-200"
    }

    // Default colors for other categories
    const defaultStyles = [
      "bg-gray-100 text-gray-700 hover:bg-gray-200",
      "bg-orange-100 text-orange-700 hover:bg-orange-200",
      "bg-teal-100 text-teal-700 hover:bg-teal-200",
    ]
    return defaultStyles[index % defaultStyles.length]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
            <div className="flex justify-end mb-6">
              <div className="h-10 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6 border">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-16 bg-gray-200 rounded mb-4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Opportunities</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadOpportunities}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className = "flex justify-between">
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 ">Opportunities</h1>
          <p className="text-gray-500">Showing {opportunities.length} results</p>
        </div>
        {/* Sort Dropdown */}
        <div className="flex justify-end mb-6 mt-[-10px]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-relevant">Most Relevant</SelectItem>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        </div>

        {/* Opportunities List */}
        {opportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No opportunities found.</p>
          </div>
        ) : (
          <div className="space-y-6 mt-2">
            {opportunities.map((opportunity, index) => (
              <Link key={opportunity.id} href={`/opportunities/${opportunity.id}`}>
                <Card className="hover:shadow-sm transition-shadow cursor-pointer bg-white border border-gray-200 hover:border-gray-300 m-6">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Company Logo */}

                      <div className="flex-shrink-0">{getCompanyLogo(opportunity.orgName, index)}</div>

                    {/* Job Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{opportunity.title}</h3>

                        <div className="text-gray-600 text-sm mb-3">
                          <span>{opportunity.orgName || "Africa to Silicon Valley"}</span>
                          {opportunity.location && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{opportunity.location.join(", ")}</span>
                            </>
                          )}
                        </div>

                        <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">
                          {opportunity.description}
                        </p>

                        {/* Categories/Tags */}
                        {opportunity.categories && opportunity.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {/* Add some sample tags to match the design */}
                            {index === 0 && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded text-xs font-medium">
                                inPerson
                              </Badge>
                            )}
                            {index === 1 && (
                              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded text-xs font-medium">
                                virtual
                              </Badge>
                            )}
                            {opportunity.categories.slice(0, 2).map((category, catIndex) => (
                              <Badge
                                key={catIndex}
                                className={`${getBadgeStyle(category, catIndex)} px-3 py-1 rounded text-xs font-medium`}
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
