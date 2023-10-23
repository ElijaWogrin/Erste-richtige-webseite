import Link from 'next/link'

import Container from 'components/Container'

export default function Links() {
  return (
    <Container>
      <div>
        <Link href='https://www.twitch.tv/frog7906' target='_blank'>
          Twitch
        </Link>
      </div>
    </Container>
  )
}
