import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getAllTransmissions } from "@/lib/database/actions/transmission.actions";
import { ITransmission } from "@/lib/database/models/transmission.model";

type TransmissionDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  userId: string;
};

function TransmissionDropdown({
  value,
  onChangeHandler,
  userId,
}: TransmissionDropdownProps) {
  const [transmissions, setTransmissions] = useState<ITransmission[]>([]);

  useEffect(() => {
    const getTypes = async () => {
      const transmissionList = await getAllTransmissions();
      transmissionList && setTransmissions(transmissionList as ITransmission[]);
    };

    getTypes();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        {transmissions.length > 0 &&
          transmissions.map((transmission) => (
            <p className="form-dropdown-item">
              <SelectItem
                key={transmission._id}
                value={transmission._id}
                className="form-dropdown-text"
              >
                {transmission.label}
              </SelectItem>
            </p>
          ))}
      </SelectContent>
    </Select>
  );
}

export default TransmissionDropdown;
