type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="text-center">
      {picture && <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />}
      <div className="italic break-all">{name}</div>
    </div>
  )
}

export default Avatar
