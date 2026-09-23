import ButtonLink from '@/components/Elements/ButtonLink'

const ContentBlock = ({
  title,
  description,
  buttonText,
  buttonVariant = 'primary',
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mx-auto">
      {title && <h2 className='text-4xl'>{title}</h2>}

      {description && <p>{description}</p>}

      {buttonText && (
        <ButtonLink variant={buttonVariant}>
          {buttonText}
        </ButtonLink>
      )}
    </div>
  )
}

export default ContentBlock