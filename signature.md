
Midterm

API



Library


RESPONSES

    header
        error
        jwt-token

    body
        {
            status: false|true,
            msg: String,
            data: {
                data
                [paginate]
            }
        }


REQUESTS:

    auth
        header
            jwt-token

/api/v1

    /auth
        POST /register
        POST /login
        GET /logout

    /book
        GET / -> Paginate
            List
        GET /:id
        POST /
        PUT /:id
        DELETE /:id

    /buy
        POST /

        




MODELS

    Book
        title
        description
        author
        quantity
        users
    
    User
        type
        email
        password
        books
        name
        family
        age
        avatar -> multer

    Customer
        book
        user
        quantity

