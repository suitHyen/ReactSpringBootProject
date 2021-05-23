const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')	

module.exports = (env) => {
    let clientPath = path.resolve(__dirname, 'src/main/client');
    let outputPath = path.resolve(__dirname, (env == 'production') ? 'src/main/resources/static' : 'out')

    // contentBase 옵션에 설정된 디렉토리 안에 있는 정적 파일들을 로드 할 수 있게됨.
    return {
        mode: !env ? 'development' : env,
        entry: { // 웹 자원 변환을 위한 진입점, 자바스크립트 파일 경로
            index: clientPath + '/index.js' 
        },
        output: { // 아웃풋 생성
            path: outputPath,
            filename: '[name].js' // [name] 은 entry 옵션에 key로 치환 이 밖에도 id, hash등이 있음.
        },
        devServer: { /* 
            웹팩 데브 서버는, 웹 애플리캐이션 개발 시 유용한 도구로서, 빌드 대상 파일이 변경 되었을 때 명령어를 실행 안해도 자동 빌드해준다. 
            회사서 npm run watch를 걸어 놓는 것과 같다. front쪽 변경시, dev 서버 열어서 확인한다.
            메모리에 저장만 하고 파일로 생성은 안하기에, 컴퓨터 내부적으로 접근 할 수 있으나 파일 조작은 안된다.
            저 프록시 설정이 있어야 cors 무시하고 서버쪽에 요청 할 수 있다. 
            */
            contentBase: outputPath,
            publicPath: '/',
            host: '0.0.0.0',
            port: 8081,
            proxy: {
                '**': 'http://127.0.0.1:8080' //요청을 여기로 한다는 뜻. 즉. 8181 에서 'http://127.0.0.1:8080 로 요청을 햇는데, cors에 안걸리게 해주는..
            },
            inline: true,
            hot: false
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }]
            }, {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }, {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: '/images',
                        limit: 1024 * 10 // 10kb
                    }
                }]
            }, {
                test: /\.(svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/images'
                    }
                }]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                path: outputPath, // 번들링된 css 파일 위치는, 기존 아웃풋과 같은 path 에 위치해야 하니
                filename: '[name].css'
            })
        ]
    }   
}

// env -> npm 명령어 실행시 넘겨 주는 값.
// 웹팩 4 mode에 developent 또는 production을 명시해야함. 개발용과 production 용
// 둘의 차이는, 난수화나.. 그 사이즈.. 등등이 있음. 정확히는.. 알아봐야..

/*



*/ 
 

