import { octokit } from './client.js';

const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

/** */
export async function findLastIssueWith(labels: string[], state: 'open' | 'closed' | 'all') {
  // See https://docs.github.com/en/rest/reference/issues
  const {
    data: [lastIssueFound],
  } = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    headers: {
      accept: 'application/vnd.github.v3+json',
    },
    owner,
    repo,
    state,
    labels: labels.join(','),
    sort: 'updated',
    direction: 'desc',
    per_page: 1,
    limit: 1,
  });

  return lastIssueFound;
}