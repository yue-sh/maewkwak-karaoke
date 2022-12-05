import { BiSolidTrash, BiSolidUpArrow } from 'solid-icons/bi'
import { createEffect, For } from 'solid-js'
import { createStore } from 'solid-js/store'
import { NotImplemented } from '~/components/NotImplemented'
import { SongItem } from '~/components/SongItem'
import { MobileLayout } from '~/layouts/MobileLayout'
import payload from '~/store/payload'

export default function Queue() {
  const [queues, setQueues] = createStore([])
  const { getPayloadURL } = payload

  const sendPayload = (event, value) => {
    fetch(getPayloadURL(event, value))
  }

  createEffect(() => {
    setInterval(() => {
      fetch(getPayloadURL('getsong', '0'))
        .then((response) => {
          response.json()
        })
        .then((res) => {
          setQueues(res as any)
        })
    }, 500)
  })

  return (
    <MobileLayout>
      <div class="space-y-4 p-4">
        <For each={queues}>
          {(song, i) => (
            <SongItem
              id={song.flag2}
              title={song.title}
              artist={song.star}
              customAction={
                <>
                  <button
                    class="w-12 h-12 rounded-md text-white bg-blue-500 hover:bg-blue-600 flex justify-center items-center"
                    onClick={() => sendPayload('upsong', `${song.flag2}`)}
                  >
                    <BiSolidUpArrow />
                  </button>
                  <button
                    class="w-12 h-12 rounded-md text-white bg-red-500 hover:bg-red-600 flex justify-center items-center"
                    onClick={() =>
                      sendPayload('deletesong', `${song.flag2}|${song.flag3}`)
                    }
                  >
                    <BiSolidTrash />
                  </button>
                </>
              }
            />
          )}
        </For>
      </div>
    </MobileLayout>
  )
}
