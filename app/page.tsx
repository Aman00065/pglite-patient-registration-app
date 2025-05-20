import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Users, Database, Info } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            Patient Registration System
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A frontend-only patient management application with client-side database storage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-all border-primary/10 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-colors">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <CardTitle>Register Patient</CardTitle>
              </div>
              <CardDescription>Add a new patient to the database</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/register">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/90 transition-all hover:shadow-md">
                  Register New Patient
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-all border-primary/10 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-colors">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Patient Records</CardTitle>
              </div>
              <CardDescription>View and search patient records</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/patients">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/90 transition-all hover:shadow-md">
                  View Patients
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-all border-primary/10 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-colors">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>SQL Query</CardTitle>
              </div>
              <CardDescription>Run custom SQL queries on patient data</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/query">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/90 transition-all hover:shadow-md">
                  SQL Interface
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-all border-primary/10 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-colors">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>About</CardTitle>
              </div>
              <CardDescription>Learn about this application</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/about">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/90 transition-all hover:shadow-md">
                  About
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            This application runs entirely in your browser. All data is stored locally and persists across page
            refreshes.
          </p>
        </div>
      </div>
    </div>
  )
}
