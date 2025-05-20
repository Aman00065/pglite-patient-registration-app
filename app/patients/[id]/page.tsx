"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { initializeDb } from "@/lib/db"
import type { Patient } from "@/lib/types"
import { ArrowLeft, Loader2, User, Phone, Mail, MapPin, FileText, Calendar, Info } from "lucide-react"

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPatient = async () => {
      setLoading(true)
      setError(null)

      try {
        const db = await initializeDb()
        const result = await db.query("SELECT * FROM patients WHERE id = $1", [params.id])

        if (result.rows.length > 0) {
          setPatient(result.rows[0])
        } else {
          setError("Patient not found")
        }
      } catch (error) {
        console.error("Error loading patient:", error)
        setError(`Failed to load patient: ${error instanceof Error ? error.message : String(error)}`)
      } finally {
        setLoading(false)
      }
    }

    loadPatient()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary/60" />
        <p className="mt-4 text-muted-foreground">Loading patient details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/patients")}
          className="mb-6 group flex items-center gap-2 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Patients
        </Button>

        <Card className="max-w-2xl mx-auto shadow-lg border-destructive/20">
          <CardContent className="pt-6 text-center py-16">
            <div className="bg-destructive/10 p-4 rounded-lg mb-4">
              <p className="text-destructive">{error}</p>
            </div>
            <Button onClick={() => router.push("/patients")} variant="outline" className="mt-2">
              Return to Patient List
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>Patient not found</p>
        <Button onClick={() => router.push("/patients")} className="mt-4">
          Return to Patient List
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Button
        variant="ghost"
        onClick={() => router.push("/patients")}
        className="mb-6 group flex items-center gap-2 hover:bg-primary/10"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Patients
      </Button>

      <Card className="max-w-3xl mx-auto shadow-lg border-primary/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">Patient Details</CardTitle>
          </div>
          <CardDescription>
            Detailed information for {patient.first_name} {patient.last_name}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="font-medium w-32 text-muted-foreground">Full Name:</span>
                    <span className="flex-1 font-semibold">
                      {patient.first_name} {patient.last_name}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium w-32 text-muted-foreground">Date of Birth:</span>
                    <span className="flex-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {patient.date_of_birth}
                      </div>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium w-32 text-muted-foreground">Gender:</span>
                    <span className="flex-1 capitalize">{patient.gender}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  System Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="font-medium w-32 text-muted-foreground">Patient ID:</span>
                    <span className="flex-1 font-mono text-sm">{patient.id}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium w-32 text-muted-foreground">Created At:</span>
                    <span className="flex-1">{new Date(patient.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {patient.email && (
                    <div className="flex items-start">
                      <span className="font-medium w-32 text-muted-foreground">Email:</span>
                      <span className="flex-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          {patient.email}
                        </div>
                      </span>
                    </div>
                  )}
                  {patient.phone && (
                    <div className="flex items-start">
                      <span className="font-medium w-32 text-muted-foreground">Phone:</span>
                      <span className="flex-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          {patient.phone}
                        </div>
                      </span>
                    </div>
                  )}
                  {patient.address && (
                    <div className="flex items-start">
                      <span className="font-medium w-32 text-muted-foreground">Address:</span>
                      <span className="flex-1">
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                          <span>{patient.address}</span>
                        </div>
                      </span>
                    </div>
                  )}
                  {!patient.email && !patient.phone && !patient.address && (
                    <p className="text-muted-foreground text-sm italic">No contact information provided</p>
                  )}
                </div>
              </div>

              {patient.medical_history && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Medical History
                  </h3>
                  <div className="p-3 bg-background rounded-md whitespace-pre-wrap text-sm border border-border">
                    {patient.medical_history}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
