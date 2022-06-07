import {
  ArrayInput,
  BooleanInput,
  DeleteButton,
  FormDataConsumer,
  SaveButton,
  SelectInput,
  showNotification,
  SimpleFormIterator,
  TextInput,
  Toolbar,
  useForm,
  useRecordContext,
  useTranslate
} from "react-admin";
import API, { BASE_URL } from "@/functions/API";
import { dateFormat } from "@/functions";
import {
  CatRefField,
  EditOptions,
  FileChips,
  List,
  ProductType,
  ShowDescription,
  showFiles,
  ShowLink,
  ShowOptions,
  ShowPictures,
  SimpleForm,
  SimpleImageField,
  UploaderField
} from "@/components";
import { Val } from "@/Utils";
import React from "react";
// import { RichTextInput } from 'ra-input-rich-text';
// import {ImportButton} from "react-admin-import-csv";


let valuess = { "photos": [], "files": [], thumbnail: "" };

function setPhotos(values) {

  // let {values} = useFormState();
  console.log("setPhotos", values);
  valuess["photos"] = values;
  // setV(!v);
  // this.forceUpdate();
}

function returnToHome(values) {
  // console.log('returnToHome', values);
  valuess["firstCategory"] = values["firstCategory"];
  valuess["secondCategory"] = values["secondCategory"];
  valuess["thirdCategory"] = values["thirdCategory"];
}

function onCreateCombinations(options) {
  // console.log('onCreateCombinations', options);
  let combCount = 1;
  let combinationsTemp = [];
  let combinations = [];
  let counter = 0;
  options.forEach((opt, key) => {
    let optemp = {};
    let theVals = [];
    opt.values.forEach((val, key2) => {
      theVals.push({ [opt.name]: val.name });

    });
    combinationsTemp.push(theVals);

  });
  // console.log('combinationsTemp', combinationsTemp);
  let ttt = cartesian(combinationsTemp);
  // console.log('ttt', ttt);

  ttt.forEach((tt, key) => {
    let obj = {};
    tt.forEach((ther, key) => {
      // obj[key]=ther;
      Object.assign(obj, ther);
    });
    combinations.push({
      id: key,
      options: obj,
      in_stock: false,
      price: null,
      salePrice: null,
      quantity: 0
    });

  });
  // (id, path, rowRecord) => form.change('combinations', combinations)
  // console.log('combinations', combinations);
  return combinations;

}

function cartesian(args) {
  let r = [], max = args.length - 1;

  function helper(arr, i) {
    for (let j = 0, l = args[i].length; j < l; j++) {
      let a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i === max)
        r.push(a);
      else
        helper(a, i + 1);
    }
  }

  helper([], 0);
  return r;
}

function returnCatsValues() {
  // console.log('returnCatsValues', values);
  return ({
    firstCategory: valuess["firstCategory"],
    secondCategory: valuess["secondCategory"],
    thirdCategory: valuess["thirdCategory"]
  });
}

function thel(values) {
  console.log("change photos field", values);

  valuess["photos"] = values;
  // console.log(values);

}

function theP(values) {
  console.log("change thumbnail field", values);
  valuess["thumbnail"] = values;
  // console.log(values);

}

function thelF(values) {
  // console.log('change files field', values);

  valuess["files"].push({
    url: values
  });
  // console.log(values);

}


function save(values) {
  // const translate = useTranslate();

  // let {values} = useFormState();
// console.clear();
//     console.log('product values', values);
//     console.log('product valuess', valuess);
  // dataProvider.createOne(values).then(()=>{
  //     console.log('hell yeah');
  // })
  // return;
  // values={...valuess};
  if (valuess.firstCategory) {
    // console.log('let us set firstCategory');
    values.firstCategory = valuess.firstCategory;

  }
  if (valuess.secondCategory) {
    // console.log('let us set secondCategory');

    values.secondCategory = valuess.secondCategory;

  }
  if (valuess.thirdCategory) {
    // console.log('let us set thirdCategory');

    values.thirdCategory = valuess.thirdCategory;

  }
  if (valuess.thumbnail) {
    values.thumbnail = valuess.thumbnail;

  }
  if (valuess.photos) {
    values.photos = valuess.photos;
    // valuess['photos']
  }

  console.log("last values: ", values);
  // return;
  if (values._id) {
    // delete values.photos;
    delete values.questions;
    delete values.nextproduct;
    delete values.category;
    delete values.catChoosed;
    delete values.files;
    console.log("last values (edit): ", values);

    API.put("/admin/product/" + values._id, JSON.stringify({ ...values }))
      .then(({ data = {} }) => {
        // const refresh = useRefresh();
        // refresh();
        // alert('it is ok');
        // showNotification(translate('product.updated'));
        window.location.reload();
        if (data.success) {
          values = [];
          valuess = [];
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  } else {
    if (valuess.photos) {
      values.photos = valuess.photos;
    }
    if (valuess.files) {
      values.files = valuess.files;
    }
    API.post("/admin/product/", JSON.stringify({ ...values }))
      .then(({ data = {} }) => {
        // showNotification(translate('product.created'));
        if (data._id) {
          window.location.href = "/#/product/" + data._id;
          values = [];
          valuess = [];
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
}


const CustomToolbar = props => (
  <Toolbar {...props} className={"dfghjk"}>
    <SaveButton/>
    <DeleteButton mutationMode="pessimistic"/>
  </Toolbar>
);

const Form = ({ children, ...props }) => {
  console.log("vprops", props);
  const record = useRecordContext();
  const translate = useTranslate();
  console.log("record", record);
  // valuess['photos'] = props.record.photos || [];
  valuess["photos"] = [];
  return (
    <SimpleForm {...props} toolbar={<CustomToolbar/>} save={save} className={"d-flex"}>
      <TextInput source={"title." + translate("lan")} label={translate("resources.product.title")}
                 className={"width100 mb-20"} validate={Val.req} fullWidth/>
      <TextInput source="slug" label={translate("resources.product.slug")} className={"width100 mb-20 ltr"} fullWidth/>

      <TextInput multiline fullWidth source="excerpt" label={translate("resources.product.excerpt")}/>
      <TextInput multiline fullWidth source="description" label={translate("resources.product.description")}/>

      <div className={"mb-20"}/>
      <BooleanInput source="story" label={translate("resources.product.story")}/>
      <TextInput source="miniTitle" label={translate("resources.product.miniTitle")}/>

      <CatRefField label={translate("resources.product.firstCategory")} returnToHome={returnToHome}
                   returnCatsValues={returnCatsValues}
                   record={record} source="firstCategory"
                   reference="category"
                   url={"/category/f/0/1000"} surl={"/category/s"}/>


      <div className={"mb-20"}/>

      <SelectInput
        label={translate("resources.product.type")}
        fullWidth
        className={"mb-20"}
        source="type"
        choices={ProductType()}

      />


      <div className={"mb-20"}></div>
      <FormDataConsumer>
        {({ formData = {} }) =>
          (<EditOptions record={props.record} onCreateCombinations={onCreateCombinations}
                        formData={formData}
                        type={formData.type}/>)

        }
      </FormDataConsumer>
      {/*<ShowPictures source="photos" thep={theP} setPhotos={setPhotos}/>*/}


      {/*<UploaderField*/}
        {/*label={translate("resources.product.photo")}*/}
        {/*accept="image/*"*/}
        {/*source="photos"*/}
        {/*multiple={true}*/}
        {/*thep={theP}*/}
        {/*setPhotos={setPhotos}*/}
        {/*inReturn={thel}*/}
      {/*/>*/}

      <div className={"mb-20"}/>

      <ArrayInput source="extra_attr"
                  label={translate("resources.product.extra_attr")}
      >
        <SimpleFormIterator {...props}>

          <FormDataConsumer>
            {({ getSource, scopedFormData }) =>
              ([
                  <div className={"mb-20"}/>,

                  <TextInput
                    fullWidth
                    source={getSource("title")}
                    label={translate("resources.product.title")}

                    record={scopedFormData}
                  />,
                  <TextInput
                    fullWidth
                    source={getSource("des")}
                    label={translate("resources.product.description")}


                    record={scopedFormData}
                  />]
              )
            }
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="labels" label={translate("resources.product.labels")}>
        <SimpleFormIterator {...props}>

          <FormDataConsumer>
            {({ getSource, scopedFormData }) =>
              (
                <TextInput
                  fullWidth
                  source={getSource("title")}

                  label={translate("resources.product.title")}

                  record={scopedFormData}
                />
              )
            }
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>


      <ArrayInput source="sources" label={translate("resources.product.sources")} fullWidth>
        <SimpleFormIterator {...props} fullWidth>

          <FormDataConsumer fullWidth>
            {({ getSource, scopedFormData }) =>
              (
                <TextInput
                  fullWidth
                  source={getSource("url")}

                  label={translate("resources.product.url")}

                  record={scopedFormData}
                />
              )
            }
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
      <SelectInput
        label={translate("resources.product.status")}

        source="status"
        choices={[
          { id: "published", name: translate("resources.product.published") },
          { id: "processing", name: translate("resources.product.processing") },
          { id: "deleted", name: translate("resources.product.deleted") }
        ]}
      />

      {children}
    </SimpleForm>
  );
};


export default Form;
