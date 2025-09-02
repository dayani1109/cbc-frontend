import { createClient } from "@supabase/supabase-js";

const anonkey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuY2plYmt3eHN0bnl5ZGNvbGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDUwOTMsImV4cCI6MjA3MjIyMTA5M30.vnjDb-5wEScaUBxuo8_kE73CRL6xH-_5Rb4KMfzAN00";
const supabaseurl = "https://ancjebkwxstnyydcolfa.supabase.co";

const supabase = createClient(supabaseurl, anonkey); //connect supabase

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    } else {
      const timestamp = new Date().getTime();
      const fileName = timestamp + file.name;

      //images kiyanne supabase eke hadapu project name ek.
      //upload() athulat dewal 3k denva 1.file.name -> file eke save vela thiyena name ek 2.file - adala file ek 3.options
      supabase.storage
        .from("images")
        .upload(fileName, file, {
          //mek promise ekk
          upsert: false,
          cacheControl: "3600",
        })
        .then(() => {
          const publicUrl = supabase.storage
            .from("images")
            .getPublicUrl(fileName).data.publicUrl;

          resolve(publicUrl);
        })
        .catch(() => {
          reject("An error occured");
        });
    }
  });
}
