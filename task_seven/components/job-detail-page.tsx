"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { fetchOpportunityById, type OpportunityDetail } from "@/lib/api"

interface JobDetailPageProps {
  opportunityId: string
}

export default function JobDetailPage({ opportunityId }: JobDetailPageProps) {
  const [opportunity, setOpportunity] = useState<OpportunityDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadOpportunity()
  }, [opportunityId])

  const loadOpportunity = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchOpportunityById(opportunityId)
      setOpportunity(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load opportunity details")
      console.error("Error loading opportunity:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return "Date not available"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-24 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded mb-8"></div>
            </div>
            <div>
              <Card className="p-6">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button
              variant="ghost"
              className="mb-8 mx-3 my-3 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 text-lg rounded-lg flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
        </Link>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Opportunity</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadOpportunity}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-600">Opportunity not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/">
        <Button variant="outline" className="mb-6 bg-gray-800 text-white hover:bg-gray-700 border-gray-800">
          Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Role Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Role Overview</h2>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{opportunity.title}</h1>
            <p className="text-gray-600 leading-relaxed text-base">{opportunity.description}</p>
          </div>

          {/* Key Responsibilities */}
          {opportunity.responsibilities && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
              <div className="space-y-3">
                {opportunity.responsibilities
                  .split("\n")
                  .filter(Boolean)
                  .map((responsibility, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{responsibility.trim()}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {opportunity.requirements && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-3">
                {opportunity.requirements
                  .split("\n")
                  .filter(Boolean)
                  .map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{requirement.trim()}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Who We're Looking For */}
          {opportunity.idealCandidate && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{"Who We're Looking For"}</h3>
              <p className="text-gray-600 leading-relaxed">{opportunity.idealCandidate}</p>
            </div>
          )}

          {/* Event Details */}
          {opportunity.whenAndWhere && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{opportunity.whenAndWhere}</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">About This Opportunity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Posted On */}
              {opportunity.datePosted && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Posted On</p>
                    <p className="text-sm text-gray-600">{formatDate(opportunity.datePosted)}</p>
                  </div>
                </div>
              )}

              {/* Deadline */}
              {opportunity.deadline && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Deadline</p>
                    <p className="text-sm text-gray-600">{formatDate(opportunity.deadline)}</p>
                  </div>
                </div>
              )}

              {/* Location */}
              {opportunity.location && opportunity.location.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600 font-medium">{opportunity.location.join(", ")}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Categories Card */}
          {opportunity.categories && opportunity.categories.length > 0 && (
            <Card className="mt-4 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {opportunity.categories.map((category, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs px-3 py-1 rounded-full border-0"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Required Skills Card */}
          {opportunity.requiredSkills && opportunity.requiredSkills.length > 0 && (
            <Card className="mt-4 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900">Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {opportunity.requiredSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-green-100 text-green-700 hover:bg-green-200 text-xs px-3 py-1 rounded-full border-0"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
