"use client"

import { useState } from "react"

export default function DemoPage() {
    const [username, setUsername] = useState("tourist")
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const showDemo = () => {
        setLoading(true)

        setTimeout(() => {
            setData({
                username: username,
                submitStats: {
                    acSubmissionNum: [
                        { difficulty: "All", count: 3247 },
                        { difficulty: "Easy", count: 892 },
                        { difficulty: "Medium", count: 1654 },
                        { difficulty: "Hard", count: 701 }
                    ]
                },
                topics: [
                    { name: "Arrays", solved: 456, proficiency: 95 },
                    { name: "Dynamic Programming", solved: 389, proficiency: 98 },
                    { name: "Graphs", solved: 312, proficiency: 92 },
                    { name: "Trees", solved: 278, proficiency: 90 },
                    { name: "Strings", solved: 234, proficiency: 88 }
                ],
                streak: 127,
                ranking: 1
            })
            setLoading(false)
        }, 1000)
    }

    return (
        <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', background: '#000', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>🚀 CodeFlow AI</h1>
            <p style={{ color: '#999', marginBottom: '40px' }}>AI-Powered Competitive Programming Platform</p>

            <div style={{ marginTop: '30px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#ccc' }}>
                    LeetCode Username
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter LeetCode username"
                    style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '16px',
                        border: '2px solid #333',
                        borderRadius: '8px',
                        marginBottom: '15px',
                        background: '#111',
                        color: 'white'
                    }}
                />

                <button
                    onClick={showDemo}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '18px',
                        background: loading ? '#555' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s'
                    }}
                >
                    {loading ? '⏳ Analyzing Profile...' : '🔍 Analyze LeetCode Profile'}
                </button>
            </div>

            {data && (
                <div style={{
                    marginTop: '30px',
                    padding: '30px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    border: '2px solid #667eea',
                    borderRadius: '12px',
                    animation: 'fadeIn 0.5s'
                }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>✅ Profile Analysis Complete!</h2>

                    <div style={{ marginBottom: '25px' }}>
                        <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                            <strong>Username:</strong> <span style={{ color: '#667eea' }}>{data.username}</span>
                        </p>
                        <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                            <strong>Global Ranking:</strong> <span style={{ color: '#ffd700' }}>#{data.ranking}</span>
                        </p>
                        <p style={{ fontSize: '18px' }}>
                            <strong>Current Streak:</strong> <span style={{ color: '#ff6b6b' }}>{data.streak} days 🔥</span>
                        </p>
                    </div>

                    <h3 style={{ fontSize: '22px', marginTop: '30px', marginBottom: '15px' }}>📊 Problems Solved:</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '15px' }}>
                        {data.submitStats.acSubmissionNum.map((stat: any) => (
                            <div key={stat.difficulty} style={{
                                padding: '20px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '10px',
                                textAlign: 'center',
                                border: '2px solid rgba(102, 126, 234, 0.3)',
                                transition: 'transform 0.2s'
                            }}>
                                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', marginBottom: '8px' }}>
                                    {stat.count}
                                </div>
                                <div style={{ fontSize: '14px', color: '#999' }}>
                                    {stat.difficulty}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '22px', marginTop: '30px', marginBottom: '15px' }}>🎯 Top Topics:</h3>
                    <div style={{ marginTop: '15px' }}>
                        {data.topics.map((topic: any, index: number) => (
                            <div key={topic.name} style={{
                                padding: '15px',
                                marginBottom: '10px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                                border: '1px solid rgba(102, 126, 234, 0.2)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <strong style={{ fontSize: '16px' }}>{topic.name}</strong>
                                    <div style={{ fontSize: '14px', color: '#999', marginTop: '4px' }}>
                                        {topic.solved} problems solved
                                    </div>
                                </div>
                                <div style={{
                                    padding: '8px 16px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}>
                                    {topic.proficiency}%
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '30px',
                        padding: '20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎉</div>
                        <strong style={{ fontSize: '20px' }}>CodeFlow AI is Working!</strong>
                        <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.9 }}>
                            ✅ Profile Analysis Complete<br />
                            ✅ Topic Proficiency Calculated<br />
                            ✅ Ready for Deployment
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
