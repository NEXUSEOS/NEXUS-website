import { Link } from 'react-router-dom'
import { Heading, Text } from '@nexus/ui'

export type ServiceTile = {
  id: string
  name: string
  category?: string
  status?: string
  health?: string
  adminPath?: string
  owner?: string
  description?: string
}

interface AdminServiceTilesProps {
  tiles: ServiceTile[]
  title?: string
}

function statusLabel(status?: string): string {
  if (!status || status === 'local_only') return 'Local'
  return status.replace(/_/g, ' ')
}

export default function AdminServiceTiles({ tiles, title = 'Platform Services' }: AdminServiceTilesProps) {
  if (!tiles.length) return null

  return (
    <section>
      <Heading as="h3" level="title">{title}</Heading>
      <Text variant="caption">{tiles.length} services — live status or graceful not-configured state</Text>
      <div className="admin-service-tiles">
        {tiles.map((tile) => {
          const content = (
            <>
              <span className="admin-service-tile__name">{tile.name}</span>
              <span className="admin-service-tile__meta">
                {tile.category ?? 'platform'} · {statusLabel(tile.status)}
                {tile.health && tile.health !== 'unknown' ? ` · ${tile.health}` : ''}
              </span>
              {tile.owner ? <span className="admin-service-tile__meta">{tile.owner}</span> : null}
            </>
          )

          if (tile.adminPath && !tile.adminPath.startsWith('http')) {
            return (
              <Link key={tile.id} to={tile.adminPath} className="admin-service-tile">
                {content}
              </Link>
            )
          }

          return (
            <div key={tile.id} className="admin-service-tile admin-service-tile--static">
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
