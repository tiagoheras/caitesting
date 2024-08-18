import React, { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";
import { bucket, supabase } from "../utils/supabaseClient";
import ImageContainer from "./ImageContainer";

function Article({ lastUpdated, sampleImages }) {
  return (
    <article className=" mx-auto font-sans relative">
      <div className="flex">
        <aside className="w-1/6">
          <div className="bg-gray-200 p-4 sticky">
            <p className="text-center">Publicidad Lateral</p>
          </div>
        </aside>

        <div className="w-4/6 px-8 bg-gray-50">

          <h1 className="text-4xl font-bold text-center my-8">
            Lorem Ipsum Dolor Sit Amet
          </h1>

          <p className="text-left mb-4 indent-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
            auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in
            nulla enim. Phasellus molestie magna non est bibendum non venenatis
            nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris
            iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
            Proin quis tortor orci. Etiam at risus et justo dignissim congue.
            Donec congue lacinia dui, a porttitor lectus condimentum laoreet.
          </p>

          <div className="float-left mr-4 mb-4 w-1/3">
            <ImageContainer
              className="w-full"
              sampleImageUrl={sampleImages[0]}
            />

            <p className="text-sm text-gray-600 mt-1">
              Epígrafe: Descripción de la imagen 1
            </p>
          </div>

          <p className="text-left mb-4 indent-8">
            Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum
            faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla
            at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet
            egestas purus in blandit. Curabitur vulputate, ligula lacinia
            scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit
            amet arcu. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet
            leo consequat posuere. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Proin vel ante a orci
            tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor
            dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam
            mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam
            porttitor mauris, quis sollicitudin sapien justo in libero.
            Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum
            elementum. Donec viverra auctor lobortis. Pellentesque eu est a
            nulla placerat dignissim. Morbi a enim in magna semper bibendum.
            Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod
            nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris
            vel neque sit amet nunc gravida congue sed sit amet purus. Quisque
            lacus quam, egestas ac tincidunt a, lacinia vel velit.
          </p>

          <h2 className="text-2xl font-semibold text-center my-8">
            Subtítulo Centrado
          </h2>

          <div className="float-right ml-4 mb-4 w-1/3">
            <ImageContainer
              className="w-full"
              sampleImageUrl={sampleImages[1]}
            />
            <p className="text-sm text-gray-600 mt-1">
              Epígrafe: Descripción de la imagen 2
            </p>
          </div>

          <p className="text-left mb-4 indent-8">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus
            qui blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>

          <h2 className="text-2xl font-semibold text-center my-8">
            Otro Subtítulo Centrado
          </h2>

          <div className="float-left mr-4 mb-4 w-1/3">
            <ImageContainer
              className="w-full"
              sampleImageUrl={sampleImages[2]}
            />
            <p className="text-sm text-gray-600 mt-1">
              Epígrafe: Descripción de la imagen 3
            </p>
          </div>

          <p className="text-left mb-4 indent-8">
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
            et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
            voluptates repudiandae sint et molestiae non recusandae. Itaque
            earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
            voluptatibus maiores alias consequatur aut perferendis doloribus
            asperiores repellat. Sed ut perspiciatis unde omnis iste natus error
            sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem.
          </p>

          <div className="clear-both"></div>

          <h2 className="text-2xl font-semibold text-center my-8">
            Comentarios
          </h2>

          <div className="border-t border-gray-300 pt-6 mt-8">
            <p>Sección de comentarios aquí</p>
          </div>
        </div>

        <aside className="w-1/6">
          <div className="bg-gray-200 p-4 sticky">
            <p className="text-center">Publicidad Lateral</p>
          </div>
        </aside>
      </div>
    </article>
  );
}

export default Article;
