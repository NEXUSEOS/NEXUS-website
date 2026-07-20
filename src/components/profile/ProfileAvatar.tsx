import type { Profile } from '../../types'
import './ProfileForm.css'

interface ProfileAvatarProps {
  profile: Profile | null
  email?: string | null
}

function getInitials(profile: Profile | null, email?: string | null): string {
  if (profile?.full_name) {
    return profile.full_name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return (email?.[0] ?? 'N').toUpperCase()
}

export default function ProfileAvatar({ profile, email }: ProfileAvatarProps) {
  const initials = getInitials(profile, email)

  return (
    <div className="profile-avatar" aria-label="Profile avatar">
      {profile?.avatar_url ? (
        <img src={profile.avatar_url} alt="" className="profile-avatar__image" />
      ) : (
        initials
      )}
    </div>
  )
}
