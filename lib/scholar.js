// Live research metrics from Semantic Scholar's public API (CORS enabled, no key needed)
export const SEMANTIC_SCHOLAR_AUTHOR_ID = "2392719152";

export async function fetchScholar() {
  const res = await fetch(
    `https://api.semanticscholar.org/graph/v1/author/${SEMANTIC_SCHOLAR_AUTHOR_ID}?fields=citationCount,hIndex,paperCount,papers.title,papers.citationCount,papers.url`
  );
  if (!res.ok) throw new Error(`Semantic Scholar responded ${res.status}`);
  const data = await res.json();

  return {
    stats: { citations: data.citationCount, hIndex: data.hIndex, papers: data.paperCount },
    papers: data.papers.map((paper) => ({
      id: paper.paperId,
      title: paper.title,
      citations: paper.citationCount,
      url: paper.url,
    })),
  };
}
