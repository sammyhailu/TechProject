/api/v1  => root of the app
        
    GET:/ping   => check if the api is working

    GET:/user   => belongs to the recruiter including any thing following this route
                   he can get his personal data

                POST:/signup  =>  recruiter/user signup
                POST:/login   =>   user login

                GET:/form  => get his own forms
                POST:/form  => create a form 

                PATCH:/form:id  => update his form by form id
                DELETE:/form:id  => delete his form by form  id
                GET:/form/:id/share  => generate a link points to the form

                GET:/applicants   => get applicants who filled his form
                POST:/applicants  => add applicant when he fill application form and submit it

                GET:/applicants:id  => get single applicant who filled his form by id
                PATCH:/applicants:id  => update applicant status(who filled his form)


    GET:/applications  => any one can go to the website and see what job application(froms) are open

    GET:/applications:id  => get single applicaion form published by the user

