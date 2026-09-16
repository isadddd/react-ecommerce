import ContentBlock from "@/components/Elements/ContentBlock";
const Hero = ({
  title,
  description,
  buttonText,
  color = "white",
  buttonVariant = "primary",
}) => {
  const bgColor = {
    pink: "bg-[pink]",
    red: "bg-[red]",
    blue: "bg-[blue]",
    white: "bg-[white]",
  };
  return (
    <section className="w-full px-4">
      <div
        className={`mx-auto flex h-100 w-full max-w-295 gap-2 mt-5 border ${bgColor[color]}`}
      >
        <ContentBlock
          title={title}
          description={description}
          buttonText={buttonText}
          buttonVariant={buttonVariant}
        />
      </div>
    </section>
  );
};

export default Hero;
