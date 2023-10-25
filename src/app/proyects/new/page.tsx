import FormNew from "@/components/proyects/FormNew";
import ContainerForm from "@/components/ContainerForm";

export default function New(){
  return(
    <ContainerForm img="/img" subtitle="Proyecto a publicar" title="Nuevo Proyecto" width="w-2/3">
      <FormNew />
    </ContainerForm>
  )
}