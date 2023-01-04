type Options = {
    wrap: HTMLElement | null
    page: number
    size: number
    total: number
    callback: Function
    // interval?: number
}
class Pagination {
    public wrap: HTMLElement | undefined
    public page: number | undefined // 初始页
    public size: number | undefined // 页面固定条数
    public total: number | undefined // 总条数
    public pages: number | undefined // 总页数
    public interval: number = 4 // 间隔的数字是 4+1 = 5 个
    public callback: Function | undefined
    constructor(options: Options) {
        this.wrap = options.wrap!
        this.page = options.page
        this.total = options.total
        this.size = options.size
        this.pages = Math.ceil(this.total / this.size)
        this.callback = options.callback
        this.init()
    }
    init() {
        // 创建dom结构
        this.wrap!.innerHTML = ""
        this.wrap!.appendChild(this.prevBtn())
        if (this.pages! > 0) {
            this.wrap?.appendChild(this.pageNum()) //添加页数按钮
        }
        this.wrap?.appendChild(this.nextBtn()) //添加下一页按钮
        this.switchPage() //绑定按钮事件
    }
    prevBtn() {
        //添加上一页按钮
        let btnprev = document.createElement('button')
        btnprev.setAttribute('class', 'btn-prev')
        btnprev.setAttribute('type', 'button')
        btnprev.innerText = '<'
        if (this.page === 1 || this.pages! <= 0) {
            btnprev.setAttribute('disabled', "true")
        } else {
            btnprev.removeAttribute('disabled')
        }
        return btnprev
    }
    changeTotal(t: number) {
        //设置新的总条数
        this.total = t || 0
        this.pages = Math.ceil(this.total / this.size!)
        this.init()
    }
    nextBtn() {
        //添加下一页按钮
        let btnnext = document.createElement('button')
        btnnext.setAttribute('class', 'btn-next')
        btnnext.setAttribute('type', 'button')
        btnnext.innerText = '>'
        if (this.page === this.pages || this.pages! <= 0) {
            btnnext.setAttribute('disabled', "true")
        } else {
            btnnext.removeAttribute('disabled')
        }
        return btnnext
    }
    switchPage() {
        //绑定按钮事件
        var _this = this //声明变量指向当前构造函数
        let numbers = this.wrap!.querySelectorAll('.number') as unknown as HTMLElement[]
        for (let i = 0, len = numbers.length; i < len; i++) {
            numbers[i].onclick = function () {
                //数字按钮点击事件
                if (_this.page != Number(numbers[i].innerText)) {
                    console.log(_this.page, Number(numbers[i].innerText))
                    _this.page = Number(numbers[i].innerText)
                    _this.init()
                    _this.callback!(_this.page) //按钮事件回调函数
                }
            }
        }
        const btnPrev = this.wrap!.querySelector('.btn-prev') as HTMLElement
        btnPrev.onclick = function () {
            //上一页按钮点击事件
            _this.page = --_this.page!
            _this.init()
            _this.callback!(_this.page) //按钮事件回调函数
        }
        const btnNext = this.wrap!.querySelector('.btn-next') as HTMLElement
        btnNext.onclick = function () {
            //下一页按钮点击事件
            _this.page!++
            _this.init()
            _this.callback!(_this.page) //按钮事件回调函数
        }
    }
    pageNum() {
        //添加页数按钮
        let ol = document.createElement('ol') //数字按钮区域容器
        ol.classList.add(this.wrap!.id + '_pager')
        let currentPage = this.page!
        let resetPages = this.pages!
        let first =
            currentPage <= this.interval
                ? 1
                : currentPage > resetPages - this.interval
                    ? resetPages - (this.interval + 1)
                    : currentPage - (this.interval - 1)
        first = first === 0 ? 1 : first
        ol.appendChild(this.renderNum(1))
        if (first - 1 >= 1) {
            ol.appendChild(this.renderButton('btn-quickprev'))
        }
        let last = first + this.interval + 2
        for (let i = first + 1; i < last; i++) {
            if (i === resetPages - this.interval && last > resetPages) {
                ol.appendChild(this.renderNum(first))
            }
            if (i <= resetPages) {
                ol.appendChild(this.renderNum(i))
            }
            if (i === last - 1 && resetPages - i > 1) {
                ol.appendChild(this.renderButton('btn-quicknext'))
                ol.appendChild(this.renderNum(resetPages))
            }
        }
        return ol
    }
    renderNum(i: number) {
        //渲染数字按钮结构
        let number = document.createElement('li')
        number.classList.add('number')
        number.innerText = String(i)
        if (i === this.page) {
            number.classList.add('active')
        }
        return number
    }
    renderButton(name: string) {
        //渲染翻页按钮结构
        let button = document.createElement('li')
        button.classList.add(name)
        button.innerText = '...'
        return button
    }
}

export default Pagination