"use client";

import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const Stats = () => {
    const [commitCount, setCommitCount] = useState(0);
    const [repoCount, setRepoCount] = useState(0);
    const [prCount, setPrCount] = useState({ created: 0, merged: 0 });
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    useEffect(() => {
        const fetchCommitCount = async () => {
            try {
                const username = 'adityashibu';
                const today = new Date();
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(today.getFullYear() - 1);

                const formatDate = (date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}T00:00:00Z`;
                };

                const since = formatDate(oneYearAgo);
                const until = formatDate(today);

                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
                    headers: {
                        Authorization: `token ${token}`
                    }
                });
                const repos = await reposResponse.json();

                const commitPromises = repos.map(async (repo) => {
                    const commitsResponse = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?since=${since}&until=${until}`, {
                        headers: {
                            Authorization: `token ${token}`
                        }
                    });
                    const commits = await commitsResponse.json();
                    return commits.length;
                });

                const commitCounts = await Promise.all(commitPromises);
                const totalCommits = commitCounts.reduce((acc, count) => acc + count, 0);

                setCommitCount(totalCommits);
            } catch (error) {
                console.error('Error fetching commit data:', error);
            }
        };

        const fetchRepoCount = async () => {
            try {
                const response = await fetch('https://api.github.com/user', {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
                const data = await response.json();

                if (data.public_repos !== undefined && data.total_private_repos !== undefined) {
                    setRepoCount(data.public_repos + data.total_private_repos);
                } else {
                    throw new Error('Failed to fetch repository count');
                }
            } catch (error) {
                console.error('Error fetching repository count:', error);
            }
        };

        const fetchPrCount = async () => {
            try {
                const username = 'adityashibu';

                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
                    headers: {
                        Authorization: `token ${token}`
                    }
                });
                const repos = await reposResponse.json();

                const prPromises = repos.map(async (repo) => {
                    const prsResponse = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/pulls?state=all`, {
                        headers: {
                            Authorization: `token ${token}`
                        }
                    });
                    const prs = await prsResponse.json();
                    const createdCount = prs.filter(pr => pr.user.login === username).length;
                    const mergedCount = prs.filter(pr => pr.merged_at).length;
                    return { created: createdCount, merged: mergedCount };
                });

                const prCounts = await Promise.all(prPromises);
                const totalCreated = prCounts.reduce((acc, count) => acc + count.created, 0);
                const totalMerged = prCounts.reduce((acc, count) => acc + count.merged, 0);

                setPrCount({ created: totalCreated, merged: totalMerged });
            } catch (error) {
                console.error('Error fetching PR data:', error);
            }
        };

        fetchRepoCount();
        fetchCommitCount();
        fetchPrCount();
    }, [token]);

    const stats = [
        {
            num: repoCount,
            text: "GitHub Repositories"
        },
        {
            num: commitCount,
            text: "Code Commits"
        },
        {
            num: prCount.created + prCount.merged,
            text: "PRs Created and Merged"
        },
        {
            num: 7,
            text: "Technologies Mastered"
        },
    ];

    return (
        <section>
            <div className="container mx-auto py-8">
                {/* Title Section */}
                <div className="mb-6 justify-center">
                    <h1 className="text-4xl font-bold text-accent text-center">Stats</h1>
                </div>
                {/* Stats Section */}
                <div className="flex flex-col xl:flex-row flex-wrap gap-6 max-w-[80vw] mx-auto md:max-w-none">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex-1 grid grid-cols-2 gap-4 items-center w-full justify-center p-4 rounded-lg xl:bg-transparent"
                        >
                            <div className="flex justify-center items-center">
                                <CountUp
                                    end={stat.num}
                                    duration={5}
                                    delay={1}
                                    className="text-5xl xl:text-7xl font-extrabold text-accent/80"
                                />
                            </div>
                            <div className="flex justify-start items-center">
                                <p className="leading-snug text-white/80 text-left">
                                    {stat.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Stats;
