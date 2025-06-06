import {TrophySpin} from "react-loading-indicators"
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <TrophySpin color="#d384f0" size="medium" text="Loading...." textColor="#fffefe" />
    </div>);
}
export default Loading
