import { SvgProps } from "@/types";
import Svg from "./svg";

type Props = {
  active: boolean;
} & SvgProps;

const AddStickerIcon = ({ active, ...props }: Props) => {
  return (
    <Svg {...props} viewBox="0 0 20 20">
      <g>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#212121" fillRule="nonzero">
              <path d="m15.1111111 2c1.5404724 0 2.7993297 1.20573757 2.8843158 2.72495653l.0045731.16393236v6.04139811c0 .530433-.1896423 1.0413133-.5313797 1.441994l-.1194941.1293544-4.8474908 4.8474908c-.3750728.3750727-.8704171.6022223-1.3953859.6439015l-.1759625.0069723h-6.04139811c-1.54047241 0-2.79932971-1.2057376-2.88431574-2.7249565l-.00457315-.1639324v-10.22222221c0-1.54047241 1.20573757-2.79932971 2.72495653-2.88431574l.16393236-.00457315zm-.0798611 1h-10.0625c-1.04200599 0-1.8949393.80951639-1.96420804 1.83395729l-.00454196.13479271v10.0625c0 1.042006.80951639 1.8949393 1.83395729 1.964208l.13479271.004542h6.0287682l.0002385-3.0919447c-1.70775648.317718-3.5378034-.1881582-4.85286069-1.5148273-.19440198-.1961185-.19301044-.512698.00310809-.7071.19611854-.1944019.51269797-.1930104.70709995.0031081 1.12993243 1.1399096 2.72592708 1.5370071 4.18052995 1.1886222.0056069-.0584031.0121555-.1086647.019386-.1541855.3843811-1.0318513 1.3520892-1.6548243 2.5023591-1.7191711l.1613709-.0045017h3.28125v-6.03125c0-1.04200599-.8095164-1.8949393-1.8339573-1.96420804zm1.5533809 9.0002645-2.7613914-.0002645c-.9649912 0-1.7548842.7496849-1.8190332 1.6984093l-.0042063.1248302v2.7607897l.086894-.078067 4.4190682-4.4190682c.0277166-.0277165.0539563-.0566338.0786687-.0866295zm-9.5846309-5.0002645c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1-1-.44771525-1-1 .44771525-1 1-1zm6 0c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1-1-.44771525-1-1 .4477153-1 1-1z" fill={ active ? '#000000' : '#888' }/>
          
          </g>
        </g>
      </g>
    </Svg>
  );
};

export default AddStickerIcon;
