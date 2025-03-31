import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { productAction } from "..";

interface FormInputs {
  title:        string;
  price:        number;
  description:  string;
  category:     string;
  image:        string;
}

export const NewProduct = () => {

  const productMutation = useMutation({
    mutationFn: productAction.createProduct,
  })

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: 'Teclado',
      price: 125.25,
      description: 'Do sunt voluptate fugiat proident in occaecat consectetur tempor consequat reprehenderit pariatur quis.',
      category: "men's clothing",
      image: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/121455712_02/w=800,h=800,fit=pad',
    }
  });

  const newImage = watch('image');

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // console.log(data);
    productMutation.mutate(data);
  }

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={ handleSubmit( onSubmit )}>

        <div className="flex justify-around items-center">

          <div className="flex-col w-[500px]">

            <Controller
              control={ control }
              name="title"
              rules={{ required: true }}
              render={({field}) => (
                <Input value={ field.value } onChange={ field.onChange}  className="mt-2" type="text" label="Titulo del producto" />
              )}
            />

            <Controller
              control={ control }
              name="price"
              rules={{ required: true }}
              render={({field}) => (
                <Input value={ field.value?.toString() } onChange={ ev => field.onChange( +ev.target.value )} className="mt-2" type="number" label="Precio del producto" />
              )}
            />  

            <Controller
              control={ control }
              name="image"
              rules={{ required: true }}
              render={({field}) => (
                <Input value={ field.value} onChange={ field.onChange} className="mt-2" type="url" label="Url del producto" />
              )}
            />  

            <Controller
              control={ control }
              name="description"
              rules={{ required: true }}
              render={({field}) => (
                <Textarea value={field.value} onChange={field.onChange} className="mt-2" label="Descripcion del producto" />
              )}
            /> 

            <Controller
              control={ control }
              name="category"
              rules={{ required: true }}
              render={({field}) => (
                <select value={field.value} onChange={field.onChange} className="rounded-md p-3 mt-2 bg-gray-800 w-full">
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            /> 


            <br />
            <Button 
              type="submit" 
              className="mt-2" 
              color="primary"
              isDisabled={ productMutation.isPending }
            >
              { productMutation.isPending ? 'Cargando...' : 'Crear producto' }
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-10 flex items-center" style={{
            width: '500px',
            height: '600px',
          }}>

            <Image
              src={ newImage }
            />
          </div>

        </div>


      </form>

    </div>
  )
}