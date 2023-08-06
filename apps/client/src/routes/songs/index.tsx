import { BiRegularSearch } from 'solid-icons/bi'
import { SongItem } from '~/components/SongItem'
import { MobileLayout } from '~/layouts/MobileLayout'

import instantsearch from 'instantsearch.js'
import { searchBox, stats } from 'instantsearch.js/es/widgets'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter'
import connectHits from 'instantsearch.js/es/connectors/hits/connectHits'
import { onMount, For } from 'solid-js'
import { render } from 'solid-js/web'
import payloadStore from '~/store/payload'
import toast from 'solid-toast'

export default function Songs() {
  const { payload: p, getPayloadURL } = payloadStore
  const adapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: 'xyz',
      nodes: [
        {
          host: '154.212.139.137',
          port: 8108,
          protocol: 'http'
        }
      ],
      cacheSearchResultsForSeconds: 2 * 60
    },
    additionalSearchParameters: {
      query_by: 'artist, title, artistRomanji, titleRomanji',
      sort_by: '_text_match:desc',
      group_limit: 1,
      per_page: 50
    }
  })
  const searchClient = adapter.searchClient

  onMount(() => {
    if (p().ip) {
      const search = instantsearch({
        searchClient,
        indexName: 'songs'
      })

      const renderHits = connectHits(({ hits, widgetParams }) => {
        const container = document.querySelector(
          (widgetParams as any).container
        )
        container.replaceChildren()
        render(
          () => (
            <div class="space-y-2">
              {search.status == 'stalled' && <>Loading</>}
              <For each={hits}>
                {(hit) => (
                  <SongItem
                    id={hit.songId}
                    title={hit.title}
                    artist={hit.artist}
                    titleRomanji={hit.titleRomanji}
                    artistRomanji={hit.artistRomanji}
                    onAdd={addSongToQueue}
                  />
                )}
              </For>
            </div>
          ),
          container
        )
      })

      search.addWidgets([
        searchBox({
          container: '#searchbox',
          cssClasses: {
            input:
              'py-4 px-6 pl-11 block w-full border-gray-200 text-sm focus:z-10 focus:border-0 focus:ring-0',
            submit: 'hidden',
            reset: 'hidden'
          },
          placeholder: 'ค้นหาชื่อเพลง หรือ ศิลปิน'
        }),
        stats({
          container: '#stats',
          cssClasses: {
            text: 'text-sm text-gray-500 pb-2'
          }
        }),
        renderHits({
          container: '#hits'
        } as any)
      ])
      search.start()
    }
  })

  const addSongToQueue = (songId: string, songName: string) => {
    // fetch to manekineko lan server
    fetch(getPayloadURL('addsong', songId), {
      method: 'POST'
    })
    toast(`เพิ่มเพลง ${songName} สำเร็จ`, {
      duration: 500,
      position: 'bottom-center'
    })
  }

  return (
    <MobileLayout>
      <div class="space-y-4">
        <div class="sticky top-0">
          <div id="searchbox" />
          <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
            <BiRegularSearch />
          </div>
        </div>

        <div class="space-y-1 px-4">
          <div id="stats" />
          <div id="hits" />
        </div>
      </div>
    </MobileLayout>
  )
}
