"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Info, Database, Layers, Zap } from "lucide-react"

export default function AboutPage() {
  const router = useRouter()

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

      <Card className="max-w-3xl mx-auto shadow-lg border-primary/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">About This Application</CardTitle>
          </div>
          <CardDescription>Patient Registration System</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Overview
            </h3>
            <p className="text-muted-foreground">
              This is a frontend-only patient registration application that uses IndexedDB for data storage. It allows
              users to register new patients, query records using SQL-like syntax, and persist patient data across page
              refreshes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Register new patients with comprehensive information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>View and search patient records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Execute SQL-like queries on patient data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Data persistence across page refreshes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Synchronization across multiple browser tabs</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Technology Stack
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Next.js - React framework</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>IndexedDB - Client-side storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Tailwind CSS - Utility-first CSS framework</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>shadcn/ui - UI component library</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>BroadcastChannel API - For cross-tab communication</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              How It Works
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                This application runs entirely in your browser. The database is implemented using IndexedDB, which
                provides a way to store structured data in the browser. This allows the application to persist data
                across page refreshes and browser sessions.
              </p>
              <p>
                The application provides a SQL-like interface that translates simple SQL queries into IndexedDB
                operations, allowing you to query and manipulate patient data using familiar SQL syntax.
              </p>
              <p>
                When changes are made in one tab, they are broadcasted to other open tabs using the BroadcastChannel
                API, ensuring that all tabs stay in sync.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
