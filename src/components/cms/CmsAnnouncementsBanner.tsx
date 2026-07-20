import { useCmsAnnouncements } from '../../services/cms/cmsExperienceService'
import './CmsAnnouncementsBanner.css'

export default function CmsAnnouncementsBanner() {
  const announcements = useCmsAnnouncements('website')

  if (announcements.length === 0) return null

  return (
    <div className="cms-announcements" role="region" aria-label="Announcements">
      {announcements.map((a) => (
        <div key={a.id} className={`cms-announcements__item cms-announcements__item--${a.severity}`}>
          <strong>{a.title}</strong>
          <span>{a.body}</span>
        </div>
      ))}
    </div>
  )
}
