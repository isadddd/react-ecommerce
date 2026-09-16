import LinkButton from '@/components/Elements/LinkButton'

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
        <LinkButton variant={buttonVariant}>
          {buttonText}
        </LinkButton>
      )}
    </div>
  )
}

export default ContentBlock