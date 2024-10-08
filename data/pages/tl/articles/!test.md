Ang Lift($L$) ay maaaring matukoy sa pamamagitan ng Lift Coefficient ($C_L$) tulad ng sumusunod na equation.

    <img src="/assets/pixra/cilre/xadni0.webp" />

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

Basic sentence structure:

```mermaid
flowchart LR
    %% common structure:
    subgraph sentence
        direction LR
        head-terms
        cu
        tail
    end
    head-terms ~~~ cu ~~~ tail
    subgraph tail["tail"]
        %% direction LR
        selbri ~~~ tail-terms
    end
    %%  semi-automated
    subgraph head-terms["head terms"]
        t1
        t2
    end
    subgraph tail-terms["tail terms"]
        tt3
        tt4
    end
    %%todo: automatically link all terms to selbri

    t1[mi]
    t2[ca]
    selbri[(tavla)]
    tt3[do]
    tt4["la .lojban."]

```

```mermaid
flowchart LR
    %% common structure:
    subgraph sentence["<i>sentence</i>#nbsp;"]
        direction LR
        head-terms
        cu{{"cu"}}
        tail
    end
    head-terms ~~~ cu ~~~ tail
    subgraph tail["<i>tail</i>#nbsp;"]
        direction LR
        selbri ~~~ tail-terms
    end
    %%  semi-automated
    subgraph head-terms["<i>head terms</i>#nbsp;"]
        t1
        t2
    end
    subgraph tail-terms["<i>tail terms</i>#nbsp;"]
        tt3
        %% tt4
    end
    %%todo: automatically link all terms to selbri

    t1(mi)
    t2(ca)
    selbri[(tavla)]
    tt3(do)
    %% tt4["la .lojban."]
```

```mermaid
%%{
    init: {
        'logLevel': 'debug',
        'theme': 'default',
        'themeVariables': {
                'commitLabelColor': '#000',
                'commitLabelBackground': '#eee',
                'commitLabelFontSize': '16px',
                'tagLabelFontSize': '14px'
        },
        'gitGraph': {
            'showCommitLabel':true,
            'mainBranchName': 'event'
        }
    }
}%%

gitGraph
    checkout event
    branch "about to start"
    commit id: "pu'o" tag: "event about to start"

    %% checkout event
    %% branch "start early"
    %% checkout "start early"
    %% commit id: "xa'o"

    checkout event
    branch "start"
    commit id: "co'a" tag: "event starts"

    %% checkout "start early"
    %% merge start

    checkout "about to start"
    merge start
    %% commit id: "#nbsp;" tag: "event continues"

    checkout start
    branch "in progress"
    commit id: "ca'o" tag: "event is in progress"

    checkout "in progress"
    branch "pause"
    commit id: "de'a" tag: "event is set on pause" type: REVERSE

    checkout "pause"
    branch "resume"
    commit id: "di'a" tag: "event resumes"

    checkout "in progress"
    branch stop
    commit id: "co'u" tag: "event aborts" type: REVERSE

    checkout "in progress"
    branch complete
    commit id: "mo'u" tag: "event completes" type: REVERSE

    checkout "in progress"
    branch "overdue"
    commit id: "za'o" tag: "events lasts for too long"

    checkout "complete"
    branch aftermath
    commit id: "ba'o" tag: "in the aftermath"
```

```mermaid
%%{
    init: {
        'logLevel': 'debug',
        'theme': 'base',
        'themeVariables': {
                'commitLabelColor': '#000',
                'commitLabelBackground': '#eee',
                'commitLabelFontSize': '16px',
                'tagLabelFontSize': '14px'
        },
        'htmlLabels': true,
        'gitGraph': {
            'showCommitLabel':true,
            'mainBranchName': 'event',
            'rotateCommitLabel': false,
            'showBranches': false
        }
    }
}%%

gitGraph
    %% checkout event
    %% branch "start early"
    %% checkout "start early"
    %% commit id: "xa'o"

    checkout event
    commit id: "pu'o - about to start"

    checkout event
    branch start
    commit id: "co'a - starts" type:HIGHLIGHT

    checkout start
    branch progress
    commit id: "ca'o - in progress"

    checkout progress
    branch stop
    commit id: "co'u - aborts" type: REVERSE

    checkout start
    branch "pause"
    commit id: "de'a - pauses" type: REVERSE

    checkout "pause"
    branch resume
    commit id: "di'a - resumes"

    %% checkout "start early"
    %% merge start
    checkout progress
    branch completion
    commit id: "mo'u - completes" type: HIGHLIGHT

    checkout completion
    branch aftermath
    commit id: "ba'o - aftermath"

    checkout progress
    branch overdue
    commit id: "za'o - lasts for too long"

```
