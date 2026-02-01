// Type definitions for better IDE support and documentation

/**
 * @typedef {'available' | 'open' | 'not-looking'} AvailabilityStatus
 */

/**
 * @typedef {Object} Project
 * @property {number} id - Unique project identifier
 * @property {string} title - Project title
 * @property {string} description - Detailed project description
 * @property {string[]} techStack - Technologies used in the project
 * @property {string} impact - Measurable impact or outcome
 * @property {string} [githubUrl] - Optional GitHub repository URL
 */

/**
 * @typedef {Object} Student
 * @property {number} id - Unique student identifier
 * @property {string} name - Full name
 * @property {string} email - Email address
 * @property {string} location - City/location
 * @property {string} githubUrl - GitHub profile URL
 * @property {string} bio - Short bio (150 chars max)
 * @property {AvailabilityStatus} availability - Job search status
 * @property {string[]} techStack - Primary tech stack
 * @property {Project[]} projects - List of projects
 */

/**
 * @typedef {Object} RecruiterProfile
 * @property {number} id - Unique recruiter identifier
 * @property {string} name - Recruiter name
 * @property {string} email - Email address
 * @property {string} companyName - Company name
 * @property {string} companyStage - Company stage (Seed, Series A, etc.)
 */

/**
 * @typedef {Object} SavedCandidate
 * @property {number} recruiterId - Recruiter who saved the candidate
 * @property {number} studentId - Student who was saved
 * @property {Date} savedAt - When the candidate was saved
 * @property {string} [notes] - Optional notes about the candidate
 */

/**
 * @typedef {Object} FilterState
 * @property {string[]} techStack - Selected tech stacks to filter by
 * @property {AvailabilityStatus[]} availability - Selected availability statuses
 */

/**
 * @typedef {Object} MapNode
 * @property {number} id - Student ID
 * @property {string} name - Student name
 * @property {string[]} techStack - Tech stack for coloring
 * @property {number} x - X coordinate in force simulation
 * @property {number} y - Y coordinate in force simulation
 * @property {number} [vx] - X velocity (D3 internal)
 * @property {number} [vy] - Y velocity (D3 internal)
 */

export {};
