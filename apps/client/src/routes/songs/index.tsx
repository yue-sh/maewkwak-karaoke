/* eslint-disable react/jsx-key */
import { BiRegularSearch } from 'solid-icons/bi'
import { SongItem } from '~/components/SongItem'
import { MobileLayout } from '~/layouts/MobileLayout'

import instantsearch from 'instantsearch.js'
import { highlight } from 'instantsearch.js/es/helpers'
import { searchBox, hits } from 'instantsearch.js/es/widgets'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter'
import { createEffect, onMount } from 'solid-js'
import connectHits from 'instantsearch.js/es/connectors/hits/connectHits'
import { render } from 'solid-js/web'
import { usePebble } from 'solid-pebble'
import { payloadpebble } from '~/pebbles/payload'

export default function Songs() {
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

    const renderHits = connectHits(({ hits, widgetParams }) => {
      const container = document.querySelector(widgetParams.container)
      container.replaceChildren()
      render(
        () => (
          <div class="space-y-2">
            {hits.map((hit) => (
              <SongItem
                id={hit.id}
                title={highlight({ attribute: 'title', hit })}
                artist={highlight({ attribute: 'artist', hit })}
                romanji={highlight({ attribute: 'TRomanji', hit })}
                artistRomanji={highlight({ attribute: 'ARomanji', hit })}
                onAdd={addSongToQueue}
              />
            ))}
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
      renderHits({
        container: '#hits'
      })
    ])
    search.start()
  })

  const addSongToQueue = (songId: string) => {
    const [p] = usePebble(payloadpebble)
    console.log(p())
    const url = `http://10.0.0.1:8080/WeixinSong_En/Udp_SelectSong.php?ip=${
      p().ip
    }&port=${p().port}&mac=${p().mac}&mid=${p().mid}&cmd=addsong&text=${songId}`
    fetch(url, {
      method: 'POST'
    }).then((response) => {
      console.log('finished')
    })
  }

  return (
    <MobileLayout>
      <div class="space-y-4">
        <div class="relative sticky top-0">
          <div id="searchbox" />
          <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
            <BiRegularSearch />
          </div>
        </div>

        <div class="space-y-1 px-4">
          <p class="text-sm text-gray-500 pb-2">
            ผลการค้นหา <b>2 รายการ</b>
          </p>
          <div id="hits" />
        </div>
      </div>
    </MobileLayout>
  )
}
