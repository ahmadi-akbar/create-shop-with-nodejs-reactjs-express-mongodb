import {
  ArrayInput,
  BooleanInput,
  Edit,
  SelectArrayInput,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  useTranslate
} from "react-admin";
import { CatRefField, DeliverySchedule, FileChips, List, showFiles, SimpleForm } from "@/components";
import API from "@/functions/API";
import { SettingsApplications as Icon } from "@mui/icons-material";
import { Val } from "@/Utils";
import useStyles from "@/styles";

const typeChoices3 = [
  {
    id: "is",
    name: "هست"
  },
  {
    id: "isnt",
    name: "نیست"
  }
];

const typeChoices = [
  {
    id: "تهران",
    name: "تهران"
  },
  {
    id: "شهرستان",
    name: "شهرستان"
  }
];

var valuess = {};

function returnToHome(values) {
  console.log("returnToHome", values);

}

function save(values) {
  // console.log('product values', values);
  // console.log('product valuess', valuess);
  // console.log('last values: ', values);
  if (values._id) {
    API.put("/admin/settings/" + values._id, JSON.stringify({ ...values }))
      .then(({ data = {} }) => {
        alert("it is ok");
        if (data.success) {
          values = [];
          valuess = [];
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  } else {

    API.post("/admin/settings/", JSON.stringify({ ...values }))
      .then(({ data = {} }) => {
        alert("it is ok");

        if (data.success) {
          values = [];
          valuess = [];
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
}


const Form = ({ children, ...props }) => {
  const translate = useTranslate();

  return (
    <SimpleForm {...props} save={save}>
      <BooleanInput source="siteActive" label={translate("resources.settings.siteActive")}/>
      <SelectArrayInput label={translate("resources.settings.activeCategory")} source="activeCategory" optionValue="_id" choices={[{
        "_id": "61d58e37d931414fd78c7fb7",
        "name": "تبلت",
        "slug": "tablets"
      }, {
        "_id": "61d58e37d931414fd78c7fb8",
        "name": "رایانه‌های رومیزی",
        "slug": "all-in-one"
      }, {
        "_id": "61d58e37d931414fd78c7fb9",
        "name": "ساعت و مچ‌بند هوشمند",
        "slug": "smart-watch"
      }, {
        "_id": "61d58e37d931414fd78c7fba",
        "name": "لوازم جانبی",
        "slug": "accessories"
      }, {
        "_id": "61d58e37d931414fd78c7fbb",
        "name": "لپ تاپ",
        "slug": "laptop"
      }, {
        "_id": "61d58e37d931414fd78c7fbc",
        "name": "کنسول های بازی",
        "slug": "gaming-console"
      }, {
        "_id": "61d58e37d931414fd78c7fbd",
        "name": "گوشی هوشمند",
        "slug": "smart-phones"
      }, { "_id": "622d964f8312bb1f3b5f8725", "name": "گیفت کارت", "slug": "gift-card" }]}/>
      <TextInput
        fullWidth
        source={"siteActiveMessage"}
        label={translate("resources.settings.siteActiveMessage")}
      />
      <ArrayInput source="data">
        <SimpleFormIterator {...props}>
          <TextInput
            fullWidth
            source={"title"}
            label={translate("resources.settings.title")}
          />
          <TextInput
          fullWidth
          source={"theid"}
          label={translate("resources.settings.theid")}
        />
          <TextInput
            fullWidth
            source={"description"}
            label={translate("resources.settings.description")}
          />


          <SelectInput
            label={translate("resources.settings.city")}
            fullWidth
            className={"mb-20"}
            source="city"
            choices={typeChoices}

          />

          <SelectInput
            label={translate("resources.settings.is_isnt")}
            fullWidth
            className={"mb-20"}
            source="is"
            choices={typeChoices3}

          />
          <TextInput

            source={"priceLessThanCondition"}
            label={translate("resources.settings.priceLessThanCondition")}
          />
          <TextInput

            source={"condition"}
            label={translate("resources.settings.condition")}
          />
          <TextInput

            source={"priceMoreThanCondition"}
            label={translate("resources.settings.priceMoreThanCondition")}
          />
        </SimpleFormIterator>
      </ArrayInput>


      {children}
    </SimpleForm>
  );
};

const edit = (props) => (
  <Edit {...props}>
    <Form>

    </Form>
  </Edit>
);


export default edit;
