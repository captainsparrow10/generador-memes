import Divider from "../divider";

interface ModalOptionProps {
  label: string;
  dividerColor?: string;
  color?: string
}

const ModalOption = ({ dividerColor, label, color }: ModalOptionProps) => {
  return ( 
  <div className="cursor-pointer">
    <p 
      className=
      {`mb-2 ${color ? `text-${color} font-semibold` : 'text-gray-400'}`}>{label}
    </p>
    <Divider color={dividerColor}/>
  </div> );
}
 
export default ModalOption;