"use client"

import { useState } from "react"

export default function TestPage() {
    const [username, setUsername] = useState("")
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchProfile = async () => {
        setLoading(true)
        setError("")
        setData(null)

        try {
            const response = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
            query getUserProfile($username: String!) {
              matchedUser(username: $username) {
                username
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }
          `,
                    variables: { username },
                }),
            })

            const result = await response.json()

            if (result.data?.matchedUser) {
                setData(result.data.matchedUser)
            } else {
                setError("User not found")
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>🚀 CodeFlow AI - Quick Test</h1>

            <div style={{ marginTop: '30px' }}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter LeetCode username"
                    style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '16px',
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        marginBottom: '15px'
                    }}
                />

                <button
                    onClick={fetchProfile}
                    disabled={loading || !username}
                    style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '16px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? 'Loading...' : 'Test LeetCode API'}
                </button>
            </div>

            {error && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    background: '#fee',
                    border: '2px solid #e74c3c',
                    borderRadius: '5px',
                    color: '#e74c3c'
                }}>
                    ❌ Error: {error}
                </div>
            )}

            {data && (
                <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    background: '#efe',
                    border: '2px solid #27ae60',
                    borderRadius: '5px'
                }}>
                    <h2>✅ Success!</h2>
                    <p><strong>Username:</strong> {data.username}</p>
                    <h3>Problems Solved:</h3>
                    <ul>
                        {data.submitStats.acSubmissionNum.map((stat: any) => (
                            <li key={stat.difficulty}>
                                <strong>{stat.difficulty}:</strong> {stat.count}
                            </li>
                        ))}
                    </ul>
                    <p style={{ marginTop: '20px', color: '#27ae60' }}>
                        <strong>🎉 LeetCode API is working!</strong>
                    </p>
                </div>
            )}
        </div>
    )
}
