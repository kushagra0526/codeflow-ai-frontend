"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function WorkingDemo() {
    const [step, setStep] = useState(0)
    const [username, setUsername] = useState("tourist")

    const demoData = {
        username: "tourist",
        stats: {
            total: 3247,
            easy: 892,
            medium: 1654,
            hard: 701,
            ranking: 1,
            streak: 127
        },
        topics: [
            { name: "Arrays", proficiency: 95, problems: 456, color: "#667eea" },
            { name: "Dynamic Programming", proficiency: 98, problems: 389, color: "#764ba2" },
            { name: "Graphs", proficiency: 92, problems: 312, color: "#ec4899" },
            { name: "Trees", proficiency: 90, problems: 278, color: "#8b5cf6" },
            { name: "Strings", proficiency: 88, problems: 234, color: "#06b6d4" }
        ],
        roadmap: [
            { title: "Two Sum", difficulty: "Easy", topics: "Arrays, Hash Table", time: "15 min" },
            { title: "Longest Palindromic Substring", difficulty: "Medium", topics: "DP, Strings", time: "25 min" },
            { title: "Binary Tree Level Order", difficulty: "Medium", topics: "Trees, BFS", time: "20 min" },
            { title: "Number of Islands", difficulty: "Medium", topics: "Graphs, DFS", time: "30 min" },
            { title: "Coin Change", difficulty: "Medium", topics: "Dynamic Programming", time: "25 min" }
        ]
    }

    const startDemo = () => {
        setStep(1)
        setTimeout(() => setStep(2), 1500)
        setTimeout(() => setStep(3), 3000)
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <h1 style={{ fontSize: '48px', color: 'white', margin: '0 0 10px 0', fontWeight: 'bold' }}>
                        🚀 CodeFlow AI
                    </h1>
                    <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                        AI-Powered Competitive Programming Platform
                    </p>
                </motion.div>

                {/* Step 0: Input */}
                {step === 0 && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '60px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            textAlign: 'center'
                        }}
                    >
                        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
                            Enter Your LeetCode Username
                        </h2>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                padding: '20px',
                                fontSize: '20px',
                                border: '3px solid #667eea',
                                borderRadius: '12px',
                                marginBottom: '30px',
                                textAlign: 'center',
                                outline: 'none'
                            }}
                            placeholder="e.g., tourist"
                        />
                        <button
                            onClick={startDemo}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '20px 60px',
                                fontSize: '24px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
                            }}
                        >
                            🔍 Analyze Profile
                        </button>
                    </motion.div>
                )}

                {/* Step 1: Analyzing */}
                {step === 1 && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '80px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            textAlign: 'center'
                        }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            style={{ fontSize: '80px', marginBottom: '30px' }}
                        >
                            ⚡
                        </motion.div>
                        <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }}>
                            Analyzing Profile...
                        </h2>
                        <p style={{ fontSize: '20px', color: '#666' }}>
                            Fetching data from LeetCode • Calculating proficiency • Generating roadmap
                        </p>
                    </motion.div>
                )}

                {/* Step 2: Results */}
                {step >= 2 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {/* Stats Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                            marginBottom: '30px'
                        }}>
                            {[
                                { label: 'Total Solved', value: demoData.stats.total, icon: '🏆' },
                                { label: 'Easy', value: demoData.stats.easy, icon: '✅' },
                                { label: 'Medium', value: demoData.stats.medium, icon: '⚡' },
                                { label: 'Hard', value: demoData.stats.hard, icon: '🔥' },
                                { label: 'Ranking', value: `#${demoData.stats.ranking}`, icon: '👑' },
                                { label: 'Streak', value: `${demoData.stats.streak} days`, icon: '🔥' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        background: 'white',
                                        borderRadius: '16px',
                                        padding: '30px',
                                        textAlign: 'center',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>{stat.icon}</div>
                                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', marginBottom: '5px' }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Topics */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            style={{
                                background: 'white',
                                borderRadius: '20px',
                                padding: '40px',
                                marginBottom: '30px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}
                        >
                            <h3 style={{ fontSize: '28px', marginBottom: '30px', color: '#333' }}>
                                🎯 Topic Proficiency
                            </h3>
                            {demoData.topics.map((topic, i) => (
                                <div key={i} style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                                            {topic.name}
                                        </span>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: topic.color }}>
                                            {topic.proficiency}%
                                        </span>
                                    </div>
                                    <div style={{
                                        background: '#f0f0f0',
                                        borderRadius: '10px',
                                        height: '12px',
                                        overflow: 'hidden'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${topic.proficiency}%` }}
                                            transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                                            style={{
                                                height: '100%',
                                                background: `linear-gradient(90deg, ${topic.color}, ${topic.color}dd)`,
                                                borderRadius: '10px'
                                            }}
                                        />
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                                        {topic.problems} problems solved
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Roadmap */}
                        {step >= 3 && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '40px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                }}
                            >
                                <h3 style={{ fontSize: '28px', marginBottom: '30px', color: '#333' }}>
                                    🗺️ Your Personalized Roadmap
                                </h3>
                                {demoData.roadmap.map((problem, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 1.7 + i * 0.1 }}
                                        style={{
                                            background: '#f8f9fa',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            marginBottom: '15px',
                                            borderLeft: `4px solid ${problem.difficulty === 'Easy' ? '#10b981' :
                                                    problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444'
                                                }`
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>
                                                    {i + 1}. {problem.title}
                                                </div>
                                                <div style={{ fontSize: '14px', color: '#666' }}>
                                                    {problem.topics} • {problem.time}
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                background: problem.difficulty === 'Easy' ? '#d1fae5' :
                                                    problem.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                                                color: problem.difficulty === 'Easy' ? '#065f46' :
                                                    problem.difficulty === 'Medium' ? '#92400e' : '#991b1b'
                                            }}>
                                                {problem.difficulty}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                <div style={{
                                    marginTop: '30px',
                                    padding: '30px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    color: 'white'
                                }}>
                                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎉</div>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                                        Analysis Complete!
                                    </div>
                                    <div style={{ fontSize: '16px', opacity: 0.9 }}>
                                        Your personalized learning path is ready. Start solving and track your progress!
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    )
}
