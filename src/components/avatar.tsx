import Image from "next/image";

type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="text-center">
      {picture && (
        <div className="relative w-12 h-12 mr-4 inline-block">
          <Image
            src={picture}
            alt={name}
            fill
            className="rounded-full object-cover"
            sizes="48px"
            loading="lazy"
          />
        </div>
      )}
      <div className="italic break-all">{name}</div>
    </div>
  )
}

export default Avatar
