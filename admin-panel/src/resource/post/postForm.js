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
  useTranslate
} from "react-admin";
import API from "@/functions/API";
import { dateFormat } from "@/functions";
import {
  CatRefField,
  Combinations,
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
  UploaderField,
  FormTabs,
  PageBuilder,
} from "@/components";
import { Val } from "@/Utils";
import React ,{useEffect,useState,Fragment, useCallback} from "react";
import { RichTextInput } from "ra-input-rich-text";
import { useListContext } from "react-admin/dist/index";
import { Divider, Tab, Tabs } from "@mui/material";

// import { RichTextInput } from 'ra-input-rich-text';
// import {ImportButton} from "react-admin-import-csv";
let combs = [];

let valuess = { "photos": [], "files": [], thumbnail: "", combinations: [] };

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
  combs = combinations;
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
  return new Promise(resolve => {
    console.log("change photos field", values);

    valuess["photos"] = values;
    resolve(values);
  }, reject => {
    reject(null);
  });

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


function CombUpdater(datas) {
  console.log("datas", datas);
  valuess["combinations"] = datas;
}

function OptsUpdater(datas) {
  console.log("datas", datas);
  valuess["options"] = datas;
}

function save(values) {
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
  let initialElements = JSON.parse(localStorage.getItem('initialElements'))
  values.elements=initialElements;
  console.log("last values: ", values);
 // return;
  if (values._id) {
    // delete values.photos;
    delete values.category;
    delete values.catChoosed;
    delete values.files;
    console.log("last values (edit): ", values);

    API.put("/post/" + values._id, JSON.stringify({ ...values }))
      .then(({ data = {} }) => {
        // const refresh = useRefresh();
        // refresh();
        // alert('it is ok');
        // showNotification(translate('post.updated'));
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
    API.post("/post/", JSON.stringify({ ...values }))
      .then(({ data = {} }) => {
        // showNotification(translate('post.created'));
        if (data._id) {
          window.location.href = "/#/post/" + data._id;
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
    <SaveButton alwaysEnable/>
    <DeleteButton mutationMode="pessimistic"/>
  </Toolbar>
);

const Form = ({ children, ...props }) => {
  // console.log("vprops", props);
  // const record = useRecordContext();
  // if (!record) return null;

  const translate = useTranslate();
  // console.log("record", record);
  // valuess['photos'] = props.record.photos || [];
  // if(valuess['options']!=record.options){
  //   record.options=valuess['options'];
  // }
  // console.log('productForm...',record);
  const totals = 0;


  return (
    [
      <SimpleForm key={0} {...props} toolbar={<CustomToolbar/>} onSubmit={save} className={"d-flex"}>
        {/*<TabbedDatagrid/>*/}
        <TextInput source={"title." + translate("lan")} fullWidth label={translate("resources.post.title")}
                   className={"width100 mb-20"}
                   validate={Val.req}/>

        <div className={"mb-20"}></div>
        <div className={"mb-20"}></div>

        <TextInput source="slug" fullWidth label={translate("resources.post.slug")} className={"width100 mb-20 ltr"}/>
        <TextInput multiline fullWidth source="excerpt" label={translate("resources.post.excerpt")}/>
        <RichTextInput multiline fullWidth source="description" label={translate("resources.post.description")}/>

        <div className={"mb-20"}></div>
        <UploaderField
          label={translate("resources.product.photo")}
          accept="image/*"
          source="photos"
          multiple={true}
          thep={theP}
          setPhotos={setPhotos}
          inReturn={thel}
        />
        <SelectInput
          label={translate("resources.post.kind")}
          defaultValue={"post"}
          source="kind"
          choices={[
            { id: "post", name: translate("resources.post.post") },
            { id: "page", name: translate("resources.post.page") }
          ]}
        />
        <SelectInput
          label={translate("resources.post.status")}
          defaultValue={"processing"}
          source="status"
          choices={[
            { id: "published", name: translate("resources.post.published") },
            { id: "processing", name: translate("resources.post.processing") },
            { id: "deleted", name: translate("resources.post.deleted") }
          ]}
        />
        {/*<ReferenceArrayInput label="انتخاب عنوان" source={getSource('title')}*/}
        {/*reference="attributes" filter={{f: true}}>*/}

        {/*<AutocompleteInput optionText="name.fa"*/}
        {/*optionValue="name.fa"/></ReferenceArrayInput>,*/}

        <PageBuilder key={1}/>
        {children}
      </SimpleForm>
      ]
   );
};


export default Form;
