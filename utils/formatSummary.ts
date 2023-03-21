import { extractSentenceWithTimestamp } from '~/utils/extractSentenceWithTimestamp'
import { extractTimestamp } from '~/utils/extractTimestamp'

/**
 * a summary generated by ChatGPT
 *
 * @export
 * @param {string} summary
 * @return {*}  {{
 *   summaryArray: string[],
 *   formattedSummary: string
 * }}
 */
export function formatSummary(summary: string): {
  summaryArray: string[]
  formattedSummary: string
} {
  /*
  if (shouldShowTimestamp) {
    try {
      const parsedBulletPoints = JSON.parse(summary);
      const summaryArray = parsedBulletPoints.map(
        ({ s, bullet_point }: { s: number; bullet_point: string }) => {
          const startTime = s === 0 ? "0.0" : s;
          return startTime + " " + bullet_point;
        }
      );
      return {
        summaryArray,
        formattedSummary: summaryArray.join("\n"),
      };
    } catch (e) {
      console.error(e);
      return {};
    }
  }
*/

  const summaryArray: string[] = summary.split('\n- ')
  const formattedSummary: string = summaryArray
    .map((s) => {
      const matchTimestampResult = extractSentenceWithTimestamp(s)
      if (matchTimestampResult) {
        const { formattedContent, timestamp } = extractTimestamp(matchTimestampResult)
        return timestamp + formattedContent
      } else {
        return s.replace(/\n\n/g, '\n')
      }
    })
    .join('\n- ')
  console.log({ summary, summaryArray, formattedSummary })
  return { summaryArray, formattedSummary }
}
