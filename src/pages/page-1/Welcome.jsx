import NavBar from "../../Navbar";
import AnimatedText from "../../AnimatedText";

function Welcome() {
  return (
    <>
      <div className="w-full min-h-screen bg-custom-background bg-cover bg-center bg-fixed p-0 m-0 bg-no-repeat">
        <NavBar></NavBar>
        <AnimatedText></AnimatedText>
      </div>
    </>
  );
}
export default Welcome;
