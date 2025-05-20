"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { initializeDb } from "@/lib/db"
import type { Patient } from "@/lib/types"
import { ArrowLeft, Loader2, Search, UserPlus, Eye } from "lucide-react"

export default function PatientsPage() {
  const router = useRouter()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  const loadPatients = async () => {
    setLoading(true)
    setError(null)

    try {
      const db = await initializeDb()
      const result = await db.query("SELECT * FROM patients ORDER BY created_at DESC")
      setPatients(result.rows)
    } catch (error) {
      console.error("Error loading patients:", error)
      setError(`Failed to load patients: ${error instanceof Error ? error.message : String(error)}`)
      setPatients([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPatients()

    // Listen for changes from other tabs
    const bc = new BroadcastChannel("patient_registration_app")
    bc.onmessage = (event) => {
      if (event.data.type === "PATIENT_ADDED") {
        loadPatients()
      }
    }

    return () => bc.close()
  }, [])

  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      patient.first_name.toLowerCase().includes(searchLower) ||
      patient.last_name.toLowerCase().includes(searchLower) ||
      patient.email?.toLowerCase().includes(searchLower) ||
      patient.phone?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="container mx-auto py-10 px-4">
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="mb-6 group flex items-center gap-2 hover:bg-primary/10"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Button>

      <Card className="shadow-lg border-primary/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="text-2xl font-bold text-primary">Patient Records</CardTitle>
          <CardDescription>View and search all registered patients</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary/60" />
              <p className="mt-4 text-muted-foreground">Loading patients...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="bg-destructive/10 p-4 rounded-lg mb-4">
                <p className="text-destructive">{error}</p>
              </div>
              <Button onClick={loadPatients} variant="outline" className="mt-2">
                <Loader2 className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="bg-muted p-8 rounded-lg">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No patients registered yet.</p>
                <Button
                  onClick={() => router.push("/register")}
                  className="bg-gradient-to-r from-primary to-primary/90 transition-all hover:shadow-md"
                >
                  Register New Patient
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Date of Birth</TableHead>
                    <TableHead className="font-semibold">Gender</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No patients match your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">
                          {patient.first_name} {patient.last_name}
                        </TableCell>
                        <TableCell>{patient.date_of_birth}</TableCell>
                        <TableCell>
                          <span className="capitalize">{patient.gender}</span>
                        </TableCell>
                        <TableCell>
                          {patient.email && <div className="text-sm">{patient.email}</div>}
                          {patient.phone && <div className="text-sm text-muted-foreground">{patient.phone}</div>}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/patients/${patient.id}`)}
                            className="hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
