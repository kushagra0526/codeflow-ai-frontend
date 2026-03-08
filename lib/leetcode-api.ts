// LeetCode GraphQL API Integration
// Fetches user profile data directly from LeetCode

export interface LeetCodeProfile {
    username: string
    realName: string
    avatar: string
    ranking: number
    reputation: number
    submitStats: {
        acSubmissionNum: Array<{
            difficulty: string
            count: number
            submissions: number
        }>
    }
    problemsSolvedBeatsStats: Array<{
        difficulty: string
        percentage: number
    }>
    tagProblemCounts: {
        advanced: Array<{ tagName: string; tagSlug: string; problemsSolved: number }>
        intermediate: Array<{ tagName: string; tagSlug: string; problemsSolved: number }>
        fundamental: Array<{ tagName: string; tagSlug: string; problemsSolved: number }>
    }
    userCalendar: {
        streak: number
        totalActiveDays: number
        submissionCalendar: string
    }
}

export interface LeetCodeStats {
    totalSolved: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    ranking: number
    reputation: number
    streak: number
    topics: Array<{
        name: string
        slug: string
        problemsSolved: number
        level: 'fundamental' | 'intermediate' | 'advanced'
    }>
}

class LeetCodeAPI {
    private readonly GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql'

    // GraphQL query to fetch user profile
    private readonly USER_PROFILE_QUERY = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
          reputation
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `

    async fetchUserProfile(username: string): Promise<LeetCodeProfile | null> {
        try {
            const response = await fetch(this.GRAPHQL_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://leetcode.com',
                },
                body: JSON.stringify({
                    query: this.USER_PROFILE_QUERY,
                    variables: { username },
                }),
            })

            if (!response.ok) {
                throw new Error(`LeetCode API error: ${response.statusText}`)
            }

            const data = await response.json()

            if (data.errors) {
                throw new Error(`GraphQL error: ${data.errors[0].message}`)
            }

            if (!data.data?.matchedUser) {
                return null // User not found
            }

            const user = data.data.matchedUser

            return {
                username: user.username,
                realName: user.profile.realName || user.username,
                avatar: user.profile.userAvatar || '',
                ranking: user.profile.ranking || 0,
                reputation: user.profile.reputation || 0,
                submitStats: user.submitStats,
                problemsSolvedBeatsStats: user.problemsSolvedBeatsStats || [],
                tagProblemCounts: user.tagProblemCounts || { advanced: [], intermediate: [], fundamental: [] },
                userCalendar: user.userCalendar || { streak: 0, totalActiveDays: 0, submissionCalendar: '{}' },
            }
        } catch (error) {
            console.error('Failed to fetch LeetCode profile:', error)
            throw error
        }
    }

    parseStats(profile: LeetCodeProfile): LeetCodeStats {
        const submitStats = profile.submitStats.acSubmissionNum
        const allStats = submitStats.find(s => s.difficulty === 'All')
        const easyStats = submitStats.find(s => s.difficulty === 'Easy')
        const mediumStats = submitStats.find(s => s.difficulty === 'Medium')
        const hardStats = submitStats.find(s => s.difficulty === 'Hard')

        // Combine all topics from different levels
        const topics = [
            ...profile.tagProblemCounts.fundamental.map(t => ({ ...t, level: 'fundamental' as const })),
            ...profile.tagProblemCounts.intermediate.map(t => ({ ...t, level: 'intermediate' as const })),
            ...profile.tagProblemCounts.advanced.map(t => ({ ...t, level: 'advanced' as const })),
        ]
            .filter(t => t.problemsSolved > 0)
            .sort((a, b) => b.problemsSolved - a.problemsSolved)
            .map(t => ({
                name: t.tagName,
                slug: t.tagSlug,
                problemsSolved: t.problemsSolved,
                level: t.level,
            }))

        return {
            totalSolved: allStats?.count || 0,
            easySolved: easyStats?.count || 0,
            mediumSolved: mediumStats?.count || 0,
            hardSolved: hardStats?.count || 0,
            ranking: profile.ranking,
            reputation: profile.reputation,
            streak: profile.userCalendar.streak,
            topics,
        }
    }

    async verifyUsername(username: string): Promise<boolean> {
        try {
            const profile = await this.fetchUserProfile(username)
            return profile !== null
        } catch (error) {
            return false
        }
    }
}

export const leetcodeAPI = new LeetCodeAPI()
