import { onMount } from 'solid-js'
import instantsearch from 'instantsearch.js'
import { highlight } from 'instantsearch.js/es/helpers'
import { searchBox, hits } from 'instantsearch.js/es/widgets'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter'

export default function App() {
  const adapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: 'xyz',
      nodes: [
        {
          host: 'typesense.chiffon.day',
          port: 443,
          protocol: 'https'
        }
      ],
      cacheSearchResultsForSeconds: 2 * 60
    },
    additionalSearchParameters: {
      query_by: 'artist, title, ARomanji, TRomanji',
      sort_by: '_text_match:desc',
      group_limit: 1,
      per_page: 50
    }
  })
  const searchClient = adapter.searchClient

  onMount(() => {
    const search = instantsearch({
      searchClient,
      indexName: 'songs'
    })
    search.addWidgets([
      searchBox({
        container: '#searchbox',
        cssClasses: {
          input: 've431d',
          submit: 'hidden',
          reset: 'hidden'
        }
      }),
      hits({
        container: '#hits',
        templates: {
          item(hit) {
            return `
            <div>
              <p class="c3e8e8">${highlight({
                attribute: 'songId',
                hit
              })}</p>
              <p class="c3e8e8"><b class="ceaf38">Artist</b>: ${highlight({
                attribute: 'artist',
                cssClasses: {
                  highlighted: 'd3er1f'
                },
                hit
              })}</p>
              <p class="c3e8e8"><b class="ceaf38">A-Romanji</b>: ${highlight({
                attribute: 'ARomanji',
                cssClasses: {
                  highlighted: 'd3er1f'
                },
                hit
              })}</p>
              <p class="c3e8e8"><b class="ceaf38">Title</b>: ${highlight({
                attribute: 'title',
                cssClasses: {
                  highlighted: 'd3er1f'
                },
                hit
              })}</p>
              <p class="c3e8e8"><b class="ceaf38">T-Romanji</b>: ${highlight({
                attribute: 'TRomanji',
                cssClasses: {
                  highlighted: 'd3er1f'
                },
                hit
              })}</p>
              <hr class="opacity-50" />
            </div>
            `
          }
        }
      })
    ])
    search.start()
  })

  return (
    <>
      <style>
        {`
					ul, li {
						list-style-type: none;
						margin: 0;
						padding: 0;
					}
					mark {
						background-color: transparent;
          }
          .ais-Hits--empty {
            display: none;
          }
				`}
      </style>
      <div id="searchbox" />
      <div id="hits" />
    </>
  )
}
