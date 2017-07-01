<hello-world>

    <h1>Hello World</h1>

    <p>
        <b>Change bg color of this html tag: </b>
        <span each={ color in bgcolors } style='background: { color }' onclick={ changeBG.bind(changeBG, color) }>&nbsp;</span>
    </p>
    <hr />
    <h3>Check out my tag attributes:</h3>

    <ul>
        <li id='{ key }' each={ value, key in opts }>

            <b>{ key }:</b> { value }
        </li>
    </ul>

    <hr />

    <h4>BY THE WAY, I can also read global JS variables such as:</h4>
    <p>Who's awesome: { app.whos_awesome }</p>
    <p>and</p>
    <p>Tutorial by: { app.tut_by }</p>

    <hr />
    <p>Styles inside riot tags get added to the <code>&lt;head&gt; &lt;/head&gt;</code> and are scoped out by tag name. See dev tools.</p>

    <style>
        :scope {

            margin: 20px auto;
            padding: 20px;
            background: #eee;
            color: #333;
            display: block;
            max-width: 600px;
            color: #777;
        }

        p span {
            height: 16px;
            width: 16px;
            margin: 0 5px;
            display: inline-block;
        }

        ul { padding: 20px; }

        ul li {
            padding: 20px;
            margin-top: 20px;
            margin-bottom: 20px;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }

        h1 { color: #c55; }
        h3 { color: #5c5; }
        h4 { color: #55c; }
    </style>

    <script>

        // If you need to access `this` inside of functions, you must
        // explicitly declare a new variable. Otherwise, you will be reference the
        // last `this` that riot use (weird quirk)
        var self = this;

        // Slight difference in syntax when using riot tags.
        // You must attach variables to the `this` object in order
        // to use them in the template.
        this.bgcolors = ['#eee', '#222', '#c00', '#0c0', '#00c', '#0cc', '#c0c', '#cc0'];

        // Functions that start like this are automatically added to the `this` variable
        // Another way to do it is declaring it like `this.changeBG = function () {}`
        // If you declare it like `function changeBG(color) {}`, it will only be available
        // inside of the tag's script element as an internal function, not the template.
        changeBG(color) {

            self.root.style.background = color;
        }

    </script>

</hello-world>
