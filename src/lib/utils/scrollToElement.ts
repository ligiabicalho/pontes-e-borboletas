export const scrollToElement = (id: string, offset: number) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const handleScroll = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  id: string,
  offset = 70,
) => {
  e.preventDefault();
  scrollToElement(id, offset);
};

export default handleScroll;
