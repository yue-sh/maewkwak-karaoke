// @refresh reload
import { Suspense } from 'solid-js'
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start'
import './styles/root.css'
import './styles/fonts/root.css'
import { PebbleBoundary } from 'solid-pebble'

export default function Root() {

  return (
    <PebbleBoundary>
      <Html lang="en">
        <Head>
          <Title>Remote Control</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </Html>
    </PebbleBoundary>
  )
}
