import ContentBlock from "@/components/Elements/ContentBlock";
const Hero = ({ title, description, buttonText, color = 'pink' }) => {
  const bgColor = {
    pink: 'bg-[pink]',
    red: 'bg-[red]',
    blue: 'bg-[blue]',
  };
  return (
    <section className="w-full px-4">
      <div
        className={`mx-auto flex h-150 w-full max-w-295 gap-2 ${bgColor[color]}`}
      >
        <ContentBlock
          title={title}
          description={description}
          buttonText={buttonText}
        />
      </div>
    </section>
  );
};

export default Hero;
