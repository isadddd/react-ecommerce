import Button from '@/components/Elements/Button'

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
        <Button variant={buttonVariant}>
          {buttonText}
        </Button>
      )}
    </div>
  )
}

export default ContentBlock