"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { initializeDb } from "@/lib/db"
import { ArrowLeft, Code, Loader2, Play } from "lucide-react"

export default function QueryPage() {
  const router = useRouter()
  const [query, setQuery] = useState("SELECT * FROM patients LIMIT 10")
  const [results, setResults] = useState<any[] | null>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  const executeQuery = async () => {
    setIsExecuting(true)
    setError(null)
    setResults(null)
    setColumns([])

    try {
      const db = await initializeDb()
      const result = await db.query(query)

      if (result.rows.length > 0) {
        setColumns(Object.keys(result.rows[0]))
        setResults(result.rows)
      } else {
        setResults([])
        setError("Query executed successfully, but returned no results.")
      }
    } catch (error) {
      console.error("Query execution error:", error)
      setError(`Error executing query: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Execute query on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      executeQuery()
    }
  }

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

      <Card className="mb-6 shadow-lg border-primary/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">SQL Query Interface</CardTitle>
          </div>
          <CardDescription>Run custom SQL queries on patient data. Press Ctrl+Enter to execute.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-muted/30 p-1 rounded-lg mb-4">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="font-mono min-h-[150px] bg-background border-0 focus-visible:ring-1 focus-visible:ring-primary/30 resize-y"
              placeholder="Enter your SQL query here..."
            />
          </div>
          <Button
            onClick={executeQuery}
            disabled={isExecuting}
            className="w-full bg-gradient-to-r from-primary to-primary/90 transition-all hover:shadow-md"
          >
            {isExecuting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Execute Query
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-6 border-destructive/20 shadow-lg">
          <CardContent className="p-4">
            <div className="bg-destructive/10 p-4 rounded-lg">
              <p className="text-destructive whitespace-pre-wrap font-mono text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card className="shadow-lg border-primary/10 overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg font-semibold">Query Results</CardTitle>
            <CardDescription>
              {results.length} row{results.length !== 1 ? "s" : ""} returned
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {results.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column} className="font-semibold">
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((row, rowIndex) => (
                      <TableRow key={rowIndex} className="hover:bg-muted/20 transition-colors">
                        {columns.map((column) => (
                          <TableCell key={column} className="font-mono text-sm">
                            {typeof row[column] === "object" ? JSON.stringify(row[column]) : String(row[column] ?? "")}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No results to display</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
